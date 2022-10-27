/* eslint-disable no-unused-vars */

const cds = require('@sap/cds')
const _ = require('lodash')



module.exports = cds.service.impl(async function () {

    //Use SAP Cloud SDK to find out the destination type (in case of Cloud Connector vs. Private Link)
    const { getDestination } = require("@sap-cloud-sdk/core")
    const bupaDestination = await getDestination("BusinessPartner")
    if (bupaDestination === null) throw Error(`Destination "BusinessPartner" not found`)
    let destinationType = bupaDestination['proxyType']

    //Connect to services
    const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV')
    const messaging = await cds.connect.to("messaging")
    const S4Srv = await cds.connect.to('tfe.service.businessPartnerValidation.S4Service')

    //Use entity definition
    const { BusinessPartnerVerification, Addresses: AddressVerification } = this.entities
    const { BusinessPartners: ExtBupa, BusinessPartnerAddresses: ExtBupaAddresses } = S4Srv.entities
    const addressColumns = ['addressId', 'streetName', 'country', 'cityName', 'postalCode', 'houseNumber']

    messaging.on('tfe/bp/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1', async (msg, req) => {
        try {
            let bupaID = msg.data.BusinessPartner
            console.log("<< BusinessPartnerCreated event caught", bupaID)

            let extBupa = await getExternalBusinessPartner(bupaID, msg)
            if (_.isUndefined(extBupa))
                return

            extBupa.addresses = await bupaSrv.tx(msg).run(SELECT.from(ExtBupaAddresses).columns(addressColumns).where({ businessPartnerId: bupaID }))
            extBupa.verificationStatus_code = 'N'
            let insertResult = await cds.tx(msg).run(INSERT.into(BusinessPartnerVerification).entries(extBupa))
            console.log(`Saved BusinessPartner ${bupaID} to the HDI Container on SAP HANA Cloud`)

            if (_.isUndefined(insertResult)) {
                console.error(`ERROR: couldn't insert new verification entry for BusinessPartner ${bupaID}, skip processing`)
                return
            }
        } catch (error) {
            req.error(error);
            console.error(error)
        }

    })

    this.before('SAVE', BusinessPartnerVerification, async (req) => {

        for (const currentAddress of req.data.addresses) {
            const payload = {
                streetName: currentAddress.streetName,
                postalCode: currentAddress.postalCode,
                cityName: currentAddress.cityName,
                houseNumber: currentAddress.houseNumber
            }

            try {
                const result = await bupaSrv.run(UPDATE(ExtBupaAddresses).set(payload).where({ businessPartnerId: req.data.businessPartnerId, addressId: currentAddress.addressId }))
                console.log(`Updated the BusinessPartnerAddress ${req.data.businessPartnerId} in SAP S/4HANA via ProxyType ${destinationType}`)
                if (result != 0) req.notify(204, `Updated [${req.data.businessPartnerFirstName} ${req.data.businessPartnerLastName}] in SAP S/4HANA`)
            } catch (error) {
                handleS4Error(error, req)
            }
        }
    })

    this.on("block", async (req) => {


        //convert verification ID to BusinessPartnerID
        let businessPartner = await getBusinessPartnerIDByUUID(req.params[0].ID, req)
        try {
            if (!_.isUndefined(businessPartner)) {
                const s4result = await bupaSrv.run(UPDATE(ExtBupa, businessPartner.businessPartnerId).with({ "businessPartnerIsBlocked": true }))
                console.log(`Blocked BusinessPartner ${businessPartner.businessPartnerId} in SAP S/4HANA via ProxyType ${destinationType}`)
                try {
                    let result = await cds.tx(req).run(UPDATE(BusinessPartnerVerification).set({ 'businessPartnerIsBlocked': true }).where({ ID: req.params[0].ID }))
                    if (result != 0) req.notify(204, `Blocked [${businessPartner.businessPartnerFirstName} ${businessPartner.businessPartnerLastName}] in SAP S/4HANA`)
                } catch (error) {
                    console.error(error)
                    req.error(400, "couldn't unblock businesspartner in SAP HANA Cloud:" + error);
                }
            }
        } catch (error) {
            handleS4Error(error, req)
        }
    })

    this.on("unblock", async (req) => {

        //convert verification ID to BusinessPartnerID
        let businessPartner = await getBusinessPartnerIDByUUID(req.params[0].ID, req)
        try {
            if (!_.isUndefined(businessPartner)) {
                const s4result = await bupaSrv.run(UPDATE(ExtBupa, businessPartner.businessPartnerId).with({ "businessPartnerIsBlocked": false }))
                console.log(`Unblocked BusinessPartner ${businessPartner.businessPartnerId} in SAP S/4HANA via ProxyType ${destinationType}`)
                try {
                    let result = await cds.tx(req).run(UPDATE(BusinessPartnerVerification).set({ 'businessPartnerIsBlocked': false }).where({ ID: req.params[0].ID }))
                    if (result != 0) req.notify(204, `Unblocked [${businessPartner.businessPartnerFirstName} ${businessPartner.businessPartnerLastName}] in SAP S/4HANA`)
                } catch (error) {
                    console.error(error)
                    req.error(400, "couldn't unblock businesspartner in SAP HANA Cloud:" + error);
                }
            }
        } catch (error) {
            handleS4Error(error, req)
        }
    })


    bupaSrv.on('BusinessPartnerChanged', async msg => {

        //Otherwise a businesspartnerchanged event is consumed before the created event..
        await new Promise(resolve => setTimeout(resolve, 1000));

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

            Object.assign(bupaVerification, extBupa)
            let updateResult = await cds.tx(msg).run(UPDATE(BusinessPartnerVerification).set(bupaVerification).where({ businessPartnerId: bupaID }))
            console.log(`Updating BusinessPartner ${bupaID} in SAP HANA Cloud`)

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
        console.log(`Reading BusinessPartner ${bupaID} from SAP S/4HANA via ProxyType ${destinationType}`)
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

    function handleS4Error(error, request) {
        if (_.isUndefined(error.reason?.response?.body?.error?.message?.value)) {
            console.log('Error:', error);
            return request.error("400", "technical problem occured")
        } else {
            console.log(error.reason.response.body.error.message.value)
            return request.error(error.statusCode, error.reason.response.body.error.message.value)
        }
    }
})
