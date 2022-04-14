var ruleServiceId = $.context.ruleServiceId;

$.context.startedBy = $.info.startedBy;

var decision;
if ($.context.History) {

    decision = {
        "UserId": $.usertasks.usertask2.last.processor,
        "Role": "Requester",
        "Action": "Reworked",
        "Comment": $.context.comment
    };
} else {

    $.context.Requester.RequestDate = new Date().toISOString().slice(0, 10);
    $.context.History = [];
    decision = {
        "UserId": $.info.startedBy,
        "Role": "Requester",
        "Action": "Initial Request",
        "Comment": $.context.Requester.Comment
    };
}

$.context.History.push(decision);
$.context.comment = "";

var details = {
    "RequestId": $.context.RequestId,
    "businessPartnerId": $.context.BusinessPartnerDetails.businessPartnerId,
    "businessPartnerFirstName": $.context.BusinessPartnerDetails.businessPartnerFirstName,
    "businessPartnerLastName": $.context.BusinessPartnerDetails.businessPartnerLastName,
    "businessPartnerIsBlocked": $.context.BusinessPartnerDetails.businessPartnerIsBlocked,
    "addressId": $.context.BusinessPartnerAddress.addressId,
    "cityName": $.context.BusinessPartnerAddress.cityName,
    "country": $.context.BusinessPartnerAddress.country,
    "houseNumber": $.context.BusinessPartnerAddress.houseNumber,
    "postalCode": $.context.BusinessPartnerAddress.postalCode,
    "streetName": $.context.BusinessPartnerAddress.streetName
};


var rulesPayload = {
    "RuleServiceId": ruleServiceId,
    "RuleServiceRevision": "Trial",
    "Vocabulary": [
        {
            "BusinessPartnerAddress": {
                "country": $.context.BusinessPartnerAddress.country
            },
            "PartnerDetails": details
        }
    ]
}
var internal = {};
$.context.internal = internal
$.context.rulesPayload = rulesPayload;