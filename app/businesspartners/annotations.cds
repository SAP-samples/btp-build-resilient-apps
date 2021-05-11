using tfe.service.businessPartnerValidation.AdminService as service from '../../srv/catalog';

annotate service.Addresses with @(UI : {
    HeaderInfo        : {
        TypeName       : 'Address',
        TypeNamePlural : 'Addresses',
        Title          : {
            $Type : 'UI.DataField',
            Value : addressId
        }
    },
    SelectionFields   : [
        addressId,
        streetName,
        cityName,
        country,
        postalCode
    ],
    LineItem          : [

        {
            $Type : 'UI.DataField',
            Value : verifications.businessPartnerId
        },
        {
            $Type : 'UI.DataField',
            Value : addressId
        },

        {
            $Type : 'UI.DataField',
            Value : streetName
        },
        {
            $Type : 'UI.DataField',
            Value : houseNumber
        },
        {
            $Type : 'UI.DataField',
            Value : postalCode
        },
        {
            $Type : 'UI.DataField',
            Value : cityName
        },
        {
            $Type : 'UI.DataField',
            Value : country
        }

    ],
    HeaderFacets      : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'BP',
            Target : '@UI.DataPoint#BP'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'Status',
            Target : '@UI.DataPoint#Status'
        }
    ],
    DataPoint #BP     : {
        Value : verifications.businessPartnerId,
        Title : 'Business Partner ID'
    },
    DataPoint #Status : {
        Value : verifications.verificationStatus_code,
        Title : 'Verification Status'
    }

});

annotate service.Addresses with {
    addressId         @(Common.Label : 'Address ID')  @readonly;
    businessPartnerId @(Common.Label : 'Business Partner ID')  @readonly;
    streetName        @(Common.Label : 'Street Name');
    cityName          @(Common.Label : 'City Name');
    country           @(Common.Label : 'Country');
    postalCode        @(Common.Label : 'Postal Code');
    houseNumber       @(Common.Label : 'House Number');
}

annotate service.BusinessPartnerVerification with {
    businessPartnerId        @(Common.Label : 'Business Partner ID');
    businessPartnerFirstName @(Common.Label : 'First Name')  @readonly;
    businessPartnerLastName  @(Common.Label : 'Last Name')  @readonly;
    verificationStatus       @(Common.Label : 'Verification Status');
    businessPartnerIsBlocked @(Common.Label : 'Blocked?');
}

annotate service.BusinessPartnerVerification with @(UI : {
    UpdateHidden        : verificationStatus.updateCode,

    HeaderInfo          : {
        TypeName       : '{i18n>Verification}',
        TypeNamePlural : '{i18n>Verifications}',
        Title          : {
            $Type : 'UI.DataField',
            Value : businessPartnerId
        }
    },
    SelectionFields     : [
        businessPartnerId,
        businessPartnerFirstName,
        businessPartnerLastName,
        verificationStatus_code,
        businessPartnerIsBlocked
    ],
    LineItem            : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'tfe.service.businessPartnerValidation.AdminService.block',
            Label  : 'Block'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'tfe.service.businessPartnerValidation.AdminService.unblock',
            Label  : 'Unblock'
        },
        {
            $Type : 'UI.DataField',
            Value : businessPartnerId
        },
        {
            $Type : 'UI.DataField',
            Value : businessPartnerFirstName
        },
        {
            $Type : 'UI.DataField',
            Value : businessPartnerLastName
        },
        {
            $Type       : 'UI.DataField',
            Value       : verificationStatus.value,
            Criticality : verificationStatus.criticality
        },
        {
            $Type : 'UI.DataField',
            Value : businessPartnerIsBlocked
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,

        },
    ],
    HeaderFacets        : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'HeaderBpFirstName',
            Target : '@UI.DataPoint#BpFName'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'HeaderBPLastName',
            Target : '@UI.DataPoint#BpLName'
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Detail'
        }

    ],
    Facets              : [{
        $Type  : 'UI.ReferenceFacet',
        Target : 'addresses/@UI.LineItem',
        Label  : 'Address Facet'
    }, ],
    DataPoint #BpFName  : {
        Value : businessPartnerFirstName,
        Title : 'First Name'
    },
    DataPoint #BpLName  : {
        Value : businessPartnerLastName,
        Title : 'Last Name'
    },
    PresentationVariant : {
        $Type          : 'UI.PresentationVariantType',
        SortOrder      : [{
            $Type      : 'Common.SortOrderType',
            Property   : modifiedAt,
            Descending : true
        }],
        Visualizations : ['@UI.LineItem']
    },
    FieldGroup #Detail  : {Data : [{
        $Type : 'UI.DataField',
        Value : verificationStatus_code,
        Label : 'Verification Status'
    }]}
});

annotate service.BusinessPartnerVerification @(Capabilities : {
    Insertable : false,
    Deletable  : false,
    Updatable  : true,
});

annotate service.Addresses @(Capabilities : {
    Deletable  : false,
    Insertable : false,
});

annotate service.BusinessPartnerVerification with {
    verificationStatus @(Common : {
        ValueList : {
            CollectionPath               : 'StatusValues',
            $Type                        : 'Common.ValueListType',
            SelectionVariantQualifier    : 'code',
            PresentationVariantQualifier : 'code',
            Parameters                   : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : verificationStatus_code,
                ValueListProperty : 'code',
            }, ]
        //entity: 'StatusValues'
        },
        ValueListWithFixedValues
    //FieldControl: #Mandatory
    });
};

annotate service.StatusValues with {
    code  @Common : {
        Text            : value,
        TextArrangement : #TextOnly
    }     @title :  'Code';
    value @title  : 'Verification Status';
};
