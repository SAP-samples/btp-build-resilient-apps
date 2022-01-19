/* eslint-disable no-unused-vars */
const { BusinessPartnerAddress: sdkBupaAddress, BusinessPartner: sdkBupa } = require('@sap/cloud-sdk-vdm-business-partner-service')

//import { BusinessPartnerAddresses } from "@sap/cloud-sdk-vdm-business-partner-service";

const cds = require('@sap/cds')
const _ = require('lodash')
const businessPartnerDestination = {
    "destinationName": "BusinessPartner"
}



module.exports = cds.service.impl(async function () {

    const { BusinessPartnerVerification, Addresses: AddressVerification } = this.entities
    const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV')
    const messaging = await cds.connect.to("messaging")
    const S4Srv = await cds.connect.to('tfe.service.businessPartnerValidation.S4Service')
    const { BusinessPartners: ExtBupa, BusinessPartnerAddresses: ExtBupaAddresses } = S4Srv.entities
    const addressColumns = ['addressId', 'streetName', 'country', 'cityName', 'postalCode', 'houseNumber']



    messaging.on('tfe/bpem/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1', async (msg, req) => {
        try {
            let bupaID = msg.data.BusinessPartner
            console.log("<< BusinessPartnerCreated event caught", bupaID)

            let extBupa = await getExternalBusinessPartner(bupaID, msg)
            if (_.isUndefined(extBupa))
                return

            extBupa.addresses = await bupaSrv.tx(msg).run(SELECT.from(ExtBupaAddresses).columns(addressColumns).where({ businessPartnerId: bupaID }))
            extBupa.verificationStatus_code = 'N'
            let insertResult = await cds.tx(msg).run(INSERT.into(BusinessPartnerVerification).entries(extBupa))

            if (_.isUndefined(insertResult)) {
                console.error(`ERROR: couldn't insert new verification entry for BusinessPartner ${bupaID}, skip processing`)
                return
            }
        } catch (error) {
            req.error(error);
            console.error(error)
        }

    })

    this.after("PATCH", AddressVerification, async (data, req) => {

        let bupaVerification = await getBusinessPartnerIDByUUID(data.verifications_ID, req)
        try {
            let bupaAddress2Update = sdkBupaAddress.builder().businessPartner(bupaVerification.businessPartnerId).addressId(data.addressId).cityName(data.cityName).postalCode(data.postalCode).streetName(data.streetName).houseNumber(data.houseNumber).build();
            let updatedBupaAddress = await sdkBupaAddress.requestBuilder().update(bupaAddress2Update).execute(businessPartnerDestination);
            console.info(updatedBupaAddress)
        }
        catch (error) {

            if (_.isUndefined(error.rootCause)) {
                console.log('Error:', error);
                return req.error("400", "technical problem occured")
            } else {
                console.log('Root cause:', error.rootCause.message);
                return req.error(error.rootCause.response.status, error.rootCause.response.data.error.message.value);
            }


        }
    })

    this.on("block", async (req) => {
        try {
            console.log(req.params[0].ID)
            let result = await cds.tx(req).run(UPDATE(BusinessPartnerVerification).set({ 'businessPartnerIsBlocked': true }).where({ ID: req.params[0].ID }))
            console.log(result)
        } catch (error) {
            if (_.isUndefined(error.rootCause)) {
                console.log('Error:', error);
                return req.reject("400", "technical problem occured")
            } else {
                console.log('Root cause:', error.rootCause.message);
                return req.reject(error.rootCause.response.status, error.rootCause.response.data.error.message.value);
            }

        }

        //convert verification ID to BusinessPartnerID
        let businessPartner = await getBusinessPartnerIDByUUID(req.params[0].ID, req)
        try {
            if (!_.isUndefined(businessPartner)) {
                let bupa2Update = sdkBupa.builder().businessPartner(businessPartner.businessPartnerId).businessPartnerIsBlocked(true).build()
                let result2 = await sdkBupa.requestBuilder().update(bupa2Update).execute(businessPartnerDestination);
            }
        } catch (error) {
            if (_.isUndefined(error.rootCause)) {
                console.log('Error:', error);
                return req.reject("400", "technical problem occured")
            } else {
                console.log('Root cause:', error.rootCause.message);
                if (_.isUndefined(error.rootCause.response.data.error)) {
                    req.reject(error.rootCause.response.status, error.rootCause.response.data);
                } else {
                    req.reject(error.rootCause.response.status, error.rootCause.response.data.error.message.value);
                }
            }
        }
    })

    this.on("unblock", async (req) => {
        try {
            let result = await cds.tx(req).run(UPDATE(BusinessPartnerVerification).set({ 'businessPartnerIsBlocked': false }).where({ ID: req.params[0].ID }))
            console.log(result)
        } catch (error) {
            console.error(error)
            req.reject(400, "couldn't unblock businesspartner:" + error);
        }

        //convert verification ID to BusinessPartnerID
        let businessPartner = await getBusinessPartnerIDByUUID(req.params[0].ID, req)
        try {
            if (!_.isUndefined(businessPartner)) {
                let bupa2Update = sdkBupa.builder().businessPartner(businessPartner.businessPartnerId).businessPartnerIsBlocked(false).build()
                let result2 = await sdkBupa.requestBuilder().update(bupa2Update).execute(businessPartnerDestination);
                console.log(result2);
            }
        } catch (error) {
            if (_.isUndefined(error.rootCause)) {
                console.log('Error:', error);
                return req.reject("400", "technical problem occured")
            } else {
                console.log('Root cause:', error.rootCause.message);
                if (_.isUndefined(error.rootCause.response.data.error)) {
                    req.reject(error.rootCause.response.status, error.rootCause.response.data);
                } else {
                    req.reject(error.rootCause.response.status, error.rootCause.response.data.error.message.value);
                }
            }
        }

    })

    bupaSrv.on('BusinessPartnerChanged', async msg => {

        try {
            let bupaID = msg.data.BusinessPartner
            const verificationColumns = ["ID", 'businessPartnerId', 'businessPartnerFirstName', 'businessPartnerLastName', 'businessPartnerIsBlocked', 'verificationStatus_code']
            console.log("<< BusinessPartnerChanged event caught", bupaID)

            let extBupa = await getExternalBusinessPartner(bupaID, msg)
            if (_.isUndefined(extBupa))
                return

            let bupaVerification = await cds.tx(msg).run(SELECT.one(BusinessPartnerVerification).columns(verificationColumns).where({ businessPartnerId: bupaID }))
            if (!bupaVerification) {

                extBupa.verificationStatus_code = 'U'
                let insertResult = await cds.tx(msg).run(INSERT.into(BusinessPartnerVerification).entries(extBupa))
                bupaVerification = await cds.tx(msg).run(SELECT.one(BusinessPartnerVerification).columns(verificationColumns).where({ businessPartnerId: bupaID }))
            }

            bupaVerification.addresses = await bupaSrv.tx(msg).run(SELECT.from(ExtBupaAddresses).columns(addressColumns).where({ businessPartnerId: bupaID }))
            bupaVerification.verificationStatus_code = 'U'

            for (const externalAddress of bupaVerification.addresses) {
                externalAddress.verifications_ID = bupaVerification.ID
            }

            let updateResult = await cds.tx(msg).run(UPDATE(BusinessPartnerVerification).set(bupaVerification).where({ businessPartnerId: bupaID }))

            if (_.isUndefined(updateResult)) {
                console.error(`ERROR: couldn't update entry for BusinessPartner ${bupaID}, skip processing`)
                return
            }

        } catch (error) {
            console.error(error)
        }

    })

    async function getExternalBusinessPartner(bupaID, req) {
        let extBupa = await bupaSrv.tx(req).run(SELECT.one(ExtBupa).where({ businessPartnerId: bupaID }))

        if (!extBupa) {
            console.error(`ERROR: couldn't find BusinessPartner ${bupaID}, skip processing`)
            return undefined;
        } else {
            return extBupa
        }
    }

    async function getBusinessPartnerIDByUUID(uuid, req) {
        let businessPartner = await cds.tx(req).run(SELECT.one(BusinessPartnerVerification).where({ ID: uuid }))

        if (!businessPartner) {
            console.error(`ERROR: couldn't find BusinessPartner for UUID ${uuid}, skip processing`)
            return undefined;
        } else {
            return businessPartner
        }
    }
})

