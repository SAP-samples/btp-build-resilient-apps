using AdminService as service from '../../srv/admin';

annotate service.Addresses with @(UI : {
    HeaderInfo        : {
        TypeName       : 'Address',
        TypeNamePlural : 'Addresses',
        Title          : {
            $Type : 'UI.DataField',
            Value : AddressID
        }
    },
    SelectionFields   : [
        AddressID,
        StreetName,
        CityName,
        Country,
        PostalCode
    ],
    LineItem          : [

        {
            $Type : 'UI.DataField',
            Value : verifications.BusinessPartner
        },
        {
            $Type : 'UI.DataField',
            Value : AddressID
        },

        {
            $Type : 'UI.DataField',
            Value : StreetName
        },
        {
            $Type : 'UI.DataField',
            Value : HouseNumber
        },
        {
            $Type : 'UI.DataField',
            Value : PostalCode
        },
        {
            $Type : 'UI.DataField',
            Value : CityName
        },
        {
            $Type : 'UI.DataField',
            Value : Country
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
        Value : verifications.BusinessPartner,
        Title : 'Business Partner ID'
    },
    DataPoint #Status : {
        Value : verifications.verificationStatus_code,
        Title : 'Verification Status'
    }

});

annotate service.Addresses with {
    AddressID        @(Common.Label : 'Address ID')           @readonly;
    BusinessPartner  @(Common.Label : 'Business Partner ID')  @readonly;
    StreetName       @(Common.Label : 'Street Name');
    CityName         @(Common.Label : 'City Name');
    Country          @(Common.Label : 'Country');
    PostalCode       @(Common.Label : 'Postal Code');
    HouseNumber      @(Common.Label : 'House Number');
}

annotate service.BusinessPartnerVerification with {
    BusinessPartner          @(Common.Label : 'Business Partner ID');
    FirstName                @(Common.Label : 'First Name')  @readonly;
    LastName                 @(Common.Label : 'Last Name')   @readonly;
    verificationStatus       @(Common.Label : 'Verification Status');
    BusinessPartnerIsBlocked @(Common.Label : 'Blocked?');
}

annotate service.BusinessPartnerVerification with @(UI : {
    UpdateHidden        : verificationStatus.updateCode,

    HeaderInfo          : {
        TypeName       : '{i18n>Verification}',
        TypeNamePlural : '{i18n>Verifications}',
        Title          : {
            $Type : 'UI.DataField',
            Value : BusinessPartner
        }
    },
    SelectionFields     : [
        BusinessPartner,
        FirstName,
        LastName,
        verificationStatus_code,
        BusinessPartnerIsBlocked
    ],
    LineItem            : [
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'AdminService.block',
            Label  : 'Block'
        },
        {
            $Type  : 'UI.DataFieldForAction',
            Action : 'AdminService.unblock',
            Label  : 'Unblock'
        },
        {
            $Type : 'UI.DataField',
            Value : BusinessPartner
        },
        {
            $Type : 'UI.DataField',
            Value : FirstName
        },
        {
            $Type : 'UI.DataField',
            Value : LastName
        },
        {
            $Type       : 'UI.DataField',
            Value       : verificationStatus.value,
            Criticality : verificationStatus.criticality
        },
        {
            $Type : 'UI.DataField',
            Value : BusinessPartnerIsBlocked
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
        Value : FirstName,
        Title : 'First Name'
    },
    DataPoint #BpLName  : {
        Value : LastName,
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
    }  @title : 'Code';
    value @title  : 'Verification Status';
};
