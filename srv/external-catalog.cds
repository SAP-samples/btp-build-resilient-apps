using OP_API_BUSINESS_PARTNER_SRV as externalBuPa from './external/OP_API_BUSINESS_PARTNER_SRV.csn';
using tfe.model.bpVerification as model from '../db/schema';

namespace tfe.service.businessPartnerValidation;

service S4Service {
    @Capabilities : {
        Insertable : true,
        Updatable  : true,
        Deletable  : false
    }

    @cds.persistence.skip
    entity BusinessPartners         as
        select from externalBuPa.A_BusinessPartner {
            key BusinessPartner          as businessPartnerId,
                BusinessPartnerIsBlocked as businessPartnerIsBlocked,
                FirstName                as businessPartnerFirstName,
                LastName                 as businessPartnerLastName
        };

    @cds.persistence.skip
    entity BusinessPartnerAddresses as projection on externalBuPa.A_BusinessPartnerAddress {
        key BusinessPartner as businessPartnerId, AddressID as addressId, Country as country, CityName as cityName, StreetName as streetName, PostalCode as postalCode, HouseNumber as houseNumber
    };
}

extend service externalBuPa with {
    @topic : 'tfe/bpem/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Created/v1'
    event BusinessPartnerCreated {
        ID              : UUID;
        BUSINESSPARTNER : String;
    }

    @topic : 'tfe/bpem/em/ce/sap/s4/beh/businesspartner/v1/BusinessPartner/Changed/v1'
    event BusinessPartnerChanged {
        ID              : UUID;
        BUSINESSPARTNER : String;
    }
}
