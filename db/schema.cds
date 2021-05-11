namespace tfe.model.bpVerification;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity Verifications : managed, cuid {
    @readonly businessPartnerId : String;
    businessPartnerFirstName    : String;
    businessPartnerLastName     : String;
    verificationStatus          : Association to StatusValues;
    addresses                   : Composition of many Addresses
                                      on addresses.verifications = $self;
    businessPartnerIsBlocked    : Boolean default false;
}

entity Addresses : cuid {
    verifications       : Association to Verifications;
    @readonly addressId : String;
    country             : String;
    cityName            : String;
    streetName          : String;
    postalCode          : String;
    houseNumber         : String;
}

@cds.autoexpose
entity StatusValues {
    key code        : String;
        value       : String;
        criticality : Integer;
        updateCode  : Boolean;
}

annotate Verifications with {
    businessPartnerId  @title : 'BusinessPartner ID'  @readonly;
    verificationStatus @title : 'Verfication Status'  @assert.enum;
}
