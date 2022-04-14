var oPayload;
oPayload = {
    FirstName: $.context.BusinessPartnerDetails.businessPartnerFirstName,
    LastName: $.context.BusinessPartnerDetails.businessPartnerLastName,
    BusinessPartnerIsBlocked: $.context.BusinessPartnerDetails.businessPartnerIsBlocked
}
$.context.internal.BPCreationPayload = { d: oPayload };