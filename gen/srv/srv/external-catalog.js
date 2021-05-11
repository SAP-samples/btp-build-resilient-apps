const cds = require('@sap/cds');

//service handlers
module.exports = cds.service.impl(async function () {


    const { BusinessPartners, BusinessPartnerAddresses } = this.entities;

    this.on('READ', BusinessPartners, async (req) => {
        try {
            const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
            //let entity = 'A_BusinessPartner';
            //let columnsToSelect = ["BusinessPartner", "FirstName", "LastName"];

            return await bupaSrv.tx(req).run(req.query)

        } catch (err) {
            req.reject(err);
        }
    });


    this.on('READ', BusinessPartnerAddresses, async (req) => {
        try {

            const bupaSrv = await cds.connect.to('OP_API_BUSINESS_PARTNER_SRV');
            //let entity = 'A_BusinessPartnerAddress';
            //let columnsToSelect = ["BusinessPartner", "AddressID", "Country", "PostalCode", "CityName", "StreetName", "HouseNumber"];
            return await bupaSrv.tx(req).run(req.query)
            /*return await bupaSrv.tx(req).run(
                SELECT.from(entity)
                    .columns(columnsToSelect)
            )*/

        } catch (err) {
            req.reject(err);
        }
    });

})