using tfe.model.bpVerification as model from '../db/schema';


namespace tfe.service.businessPartnerValidation;

service AdminService {
    @odata.draft.enabled
    entity BusinessPartnerVerification as projection on model.Verifications actions {
        @Common.SideEffects  : {TargetProperties : [
        'businessPartnerIsBlocked',
        'verificationStatus_code'
        ]}
        @sap.applicable.path : 'block' action block();
        @Common.SideEffects  : {TargetProperties : [
        'businessPartnerIsBlocked',
        'verificationStatus_code'
        ]}
        @sap.applicable.path : 'unblock' action unblock();
    }

    entity StatusValues                as projection on model.StatusValues;
    entity Addresses                   as projection on model.Addresses;
    function testFunction() returns String;

}

annotate AdminService with @(requires : 'authenticated-user');

annotate AdminService.Addresses with @(restrict : [{
    grant : ['*'],
    to    : 'BPAdmin'
}]);


annotate AdminService.BusinessPartnerVerification with @(restrict : [{
    grant : ['*'],
    to    : 'BPAdmin'
}]);
