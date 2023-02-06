namespace tfe.model.bpVerification;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity Verifications : managed, cuid {
    @readonly BusinessPartner : String;
    FirstName                 : String;
    LastName                  : String;
    verificationStatus        : Association to StatusValues;
    addresses                 : Composition of many Addresses
                                    on addresses.verifications = $self;
    BusinessPartnerIsBlocked  : Boolean default false;
}

entity Addresses: cuid {
        verifications : Association to Verifications;
        AddressID     : String;
        Country       : String;
        CityName      : String;
        StreetName    : String;
        PostalCode    : String;
        HouseNumber   : String;
}

entity Backlogs : managed, cuid {
    method       : String;
    verification : Association to Verifications;
    updateNeeded : Boolean;
    criticality  : Criticality;
}

type Criticality : String enum {
    INFO;
    WARNING;
    ERROR;
}

@cds.autoexpose
entity StatusValues {
    key code        : String;
        value       : String;
        criticality : Integer;
        updateCode  : Boolean;
}

annotate Verifications with {
    BusinessPartner     @title : 'BusinessPartner ID'  @readonly;
    verificationStatus  @title : 'Verfication Status'  @assert.enum;
}
