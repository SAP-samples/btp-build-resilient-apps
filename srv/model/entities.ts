export namespace tfe.model.bpVerification {
  export enum Criticality {
    INFO,
    WARNING,
    ERROR
  }

  export interface Verifications {
    createdAt?: Date
    createdBy?: string
    modifiedAt?: Date
    modifiedBy?: string
    ID: string
    BusinessPartner: string
    FirstName: string
    LastName: string
    verificationStatus?: StatusValues
    verificationStatus_code?: string
    addresses: Addresses[]
    BusinessPartnerIsBlocked?: boolean
  }

  export interface Addresses {
    verifications?: Verifications
    verifications_ID?: string
    AddressID: string
    Country: string
    CityName: string
    StreetName: string
    PostalCode: string
    HouseNumber: string
  }

  export interface Backlogs {
    createdAt?: Date
    createdBy?: string
    modifiedAt?: Date
    modifiedBy?: string
    ID: string
    method: string
    verification?: Verifications
    verification_ID?: string
    updateNeeded: boolean
    criticality: Criticality
  }

  export interface StatusValues {
    code: string
    value: string
    criticality: number
    updateCode: boolean
  }

  export enum Entity {
    Verifications = 'tfe.model.bpVerification.Verifications',
    Addresses = 'tfe.model.bpVerification.Addresses',
    Backlogs = 'tfe.model.bpVerification.Backlogs',
    StatusValues = 'tfe.model.bpVerification.StatusValues'
  }

  export enum SanitizedEntity {
    Verifications = 'Verifications',
    Addresses = 'Addresses',
    Backlogs = 'Backlogs',
    StatusValues = 'StatusValues'
  }
}

export namespace sap.common {
  export interface Languages {
    name: string
    descr: string
    code: string
    texts: Texts[]
    localized?: Texts
  }

  export interface Countries {
    name: string
    descr: string
    code: string
    texts: Texts[]
    localized?: Texts
  }

  export interface Currencies {
    name: string
    descr: string
    code: string
    symbol: string
    texts: Texts[]
    localized?: Texts
  }

  export interface Texts {
    locale: string
    name: string
    descr: string
    code: string
  }

  export interface Texts {
    locale: string
    name: string
    descr: string
    code: string
  }

  export interface Texts {
    locale: string
    name: string
    descr: string
    code: string
  }

  export enum Entity {
    Languages = 'sap.common.Languages',
    Countries = 'sap.common.Countries',
    Currencies = 'sap.common.Currencies',
    Texts = 'sap.common.Currencies.texts'
  }

  export enum SanitizedEntity {
    Languages = 'Languages',
    Countries = 'Countries',
    Currencies = 'Currencies',
    Texts = 'Texts'
  }
}

export namespace AdminService {
  export interface BusinessPartnerVerification {
    createdAt?: Date
    createdBy?: string
    modifiedAt?: Date
    modifiedBy?: string
    ID: string
    BusinessPartner: string
    FirstName: string
    LastName: string
    verificationStatus?: StatusValues
    verificationStatus_code?: string
    addresses: Addresses[]
    BusinessPartnerIsBlocked?: boolean
  }

  export namespace BusinessPartnerVerification.actions {
    export enum ActionBlock {
      name = 'block'
    }

    export enum ActionUnblock {
      name = 'unblock'
    }
  }

  export interface BusinessPartner {
    BusinessPartner: string
    BusinessPartnerIsBlocked: boolean
    FirstName: string
    LastName: string
    addresses: BusinessPartnerAddresses[]
  }

  export interface BusinessPartnerAddresses {
    BusinessPartner?: BusinessPartner
    BusinessPartner_BusinessPartner?: string
    AddressID: string
    Country: string
    CityName: string
    StreetName: string
    PostalCode: string
    HouseNumber: string
  }

  export interface StatusValues {
    code: string
    value: string
    criticality: number
    updateCode: boolean
  }

  export interface Addresses {
    verifications?: BusinessPartnerVerification
    verifications_ID?: string
    AddressID: string
    Country: string
    CityName: string
    StreetName: string
    PostalCode: string
    HouseNumber: string
  }

  export enum FuncTestFunction {
    name = 'testFunction'
  }

  export type FuncTestFunctionReturn = string

  export enum Entity {
    BusinessPartnerVerification = 'AdminService.BusinessPartnerVerification',
    BusinessPartner = 'AdminService.BusinessPartner',
    BusinessPartnerAddresses = 'AdminService.BusinessPartnerAddresses',
    StatusValues = 'AdminService.StatusValues',
    Addresses = 'AdminService.Addresses'
  }

  export enum SanitizedEntity {
    BusinessPartnerVerification = 'BusinessPartnerVerification',
    BusinessPartner = 'BusinessPartner',
    BusinessPartnerAddresses = 'BusinessPartnerAddresses',
    StatusValues = 'StatusValues',
    Addresses = 'Addresses'
  }
}

export namespace OP_API_BUSINESS_PARTNER_SRV {
  export interface A_AddressEmailAddress {
    AddressID: string
    Person: string
    OrdinalNumber: string
    IsDefaultEmailAddress: boolean
    EmailAddress: string
    SearchEmailAddress: string
    AddressCommunicationRemarkText: string
  }

  export interface A_AddressFaxNumber {
    AddressID: string
    Person: string
    OrdinalNumber: string
    IsDefaultFaxNumber: boolean
    FaxCountry: string
    FaxNumber: string
    FaxNumberExtension: string
    InternationalFaxNumber: string
    AddressCommunicationRemarkText: string
  }

  export interface A_AddressHomePageURL {
    AddressID: string
    Person: string
    OrdinalNumber: string
    ValidityStartDate: Date
    IsDefaultURLAddress: boolean
    SearchURLAddress: string
    AddressCommunicationRemarkText: string
    URLFieldLength: number
    WebsiteURL: string
  }

  export interface A_AddressPhoneNumber {
    AddressID: string
    Person: string
    OrdinalNumber: string
    DestinationLocationCountry: string
    IsDefaultPhoneNumber: boolean
    PhoneNumber: string
    PhoneNumberExtension: string
    InternationalPhoneNumber: string
    PhoneNumberType: string
    AddressCommunicationRemarkText: string
  }

  export interface A_BPAddrDepdntIntlLocNumber {
    BusinessPartner: string
    AddressID: string
    InternationalLocationNumber1: string
    InternationalLocationNumber2: string
    InternationalLocationNumber3: string
  }

  export interface A_BPContactToAddress {
    RelationshipNumber: string
    BusinessPartnerCompany: string
    BusinessPartnerPerson: string
    ValidityEndDate: Date
    AddressID: string
    AddressNumber: string
    AdditionalStreetPrefixName: string
    AdditionalStreetSuffixName: string
    AddressTimeZone: string
    CareOfName: string
    CityCode: string
    CityName: string
    CompanyPostalCode: string
    Country: string
    County: string
    DeliveryServiceNumber: string
    DeliveryServiceTypeCode: string
    District: string
    FormOfAddress: string
    FullName: string
    HomeCityName: string
    HouseNumber: string
    HouseNumberSupplementText: string
    Language: string
    POBox: string
    POBoxDeviatingCityName: string
    POBoxDeviatingCountry: string
    POBoxDeviatingRegion: string
    POBoxIsWithoutNumber: boolean
    POBoxLobbyName: string
    POBoxPostalCode: string
    Person: string
    PostalCode: string
    PrfrdCommMediumType: string
    Region: string
    StreetName: string
    StreetPrefixName: string
    StreetSuffixName: string
    TaxJurisdiction: string
    TransportZone: string
    AddressRepresentationCode: string
    ContactRelationshipFunction: string
    ContactRelationshipDepartment: string
    Floor: string
    ContactPersonBuilding: string
    RoomNumber: string
    ContactPersonPrfrdCommMedium: string
    CorrespondenceShortName: string
    InhouseMail: string
    to_EmailAddress?: A_AddressEmailAddress[]
    to_FaxNumber?: A_AddressFaxNumber[]
    to_MobilePhoneNumber?: A_AddressPhoneNumber[]
    to_PhoneNumber?: A_AddressPhoneNumber[]
    to_URLAddress?: A_AddressHomePageURL[]
  }

  export interface A_BPContactToFuncAndDept {
    RelationshipNumber: string
    BusinessPartnerCompany: string
    BusinessPartnerPerson: string
    ValidityEndDate: Date
    ContactPersonFunction: string
    ContactPersonDepartment: string
    PhoneNumber: string
    PhoneNumberExtension: string
    FaxNumber: string
    FaxNumberExtension: string
    EmailAddress: string
    RelationshipCategory: string
  }

  export interface A_BuPaAddressUsage {
    BusinessPartner: string
    ValidityEndDate: Date
    AddressUsage: string
    AddressID: string
    ValidityStartDate: Date
    StandardUsage: boolean
    AuthorizationGroup: string
  }

  export interface A_BuPaIdentification {
    BusinessPartner: string
    BPIdentificationType: string
    BPIdentificationNumber: string
    BPIdnNmbrIssuingInstitute: string
    BPIdentificationEntryDate: Date
    Country: string
    Region: string
    ValidityStartDate: Date
    ValidityEndDate: Date
    AuthorizationGroup: string
  }

  export interface A_BuPaIndustry {
    IndustrySector: string
    IndustrySystemType: string
    BusinessPartner: string
    IsStandardIndustry: string
    IndustryKeyDescription: string
  }

  export interface A_BusinessPartner {
    BusinessPartner: string
    Customer: string
    Supplier: string
    AcademicTitle: string
    AuthorizationGroup: string
    BusinessPartnerCategory: string
    BusinessPartnerFullName: string
    BusinessPartnerGrouping: string
    BusinessPartnerName: string
    BusinessPartnerUUID: string
    CorrespondenceLanguage: string
    CreatedByUser: string
    CreationDate: Date
    CreationTime: Date
    FirstName: string
    FormOfAddress: string
    Industry: string
    InternationalLocationNumber1: string
    InternationalLocationNumber2: string
    IsFemale: boolean
    IsMale: boolean
    IsNaturalPerson: string
    IsSexUnknown: boolean
    GenderCodeName: string
    Language: string
    LastChangeDate: Date
    LastChangeTime: Date
    LastChangedByUser: string
    LastName: string
    LegalForm: string
    OrganizationBPName1: string
    OrganizationBPName2: string
    OrganizationBPName3: string
    OrganizationBPName4: string
    OrganizationFoundationDate: Date
    OrganizationLiquidationDate: Date
    SearchTerm1: string
    SearchTerm2: string
    AdditionalLastName: string
    BirthDate: Date
    BusinessPartnerBirthDateStatus: string
    BusinessPartnerBirthplaceName: string
    BusinessPartnerDeathDate: Date
    BusinessPartnerIsBlocked: boolean
    BusinessPartnerType: string
    ETag: string
    GroupBusinessPartnerName1: string
    GroupBusinessPartnerName2: string
    IndependentAddressID: string
    InternationalLocationNumber3: string
    MiddleName: string
    NameCountry: string
    NameFormat: string
    PersonFullName: string
    PersonNumber: string
    IsMarkedForArchiving: boolean
    BusinessPartnerIDByExtSystem: string
    BusinessPartnerPrintFormat: string
    BusinessPartnerOccupation: string
    BusPartMaritalStatus: string
    BusPartNationality: string
    BusinessPartnerBirthName: string
    BusinessPartnerSupplementName: string
    NaturalPersonEmployerName: string
    LastNamePrefix: string
    LastNameSecondPrefix: string
    Initials: string
    TradingPartner: string
    to_BuPaIdentification?: A_BuPaIdentification[]
    to_BuPaIndustry?: A_BuPaIndustry[]
    to_BusinessPartnerAddress: A_BusinessPartnerAddress[]
    to_BusinessPartnerBank?: A_BusinessPartnerBank[]
    to_BusinessPartnerContact?: A_BusinessPartnerContact[]
    to_BusinessPartnerRole?: A_BusinessPartnerRole[]
    to_BusinessPartnerTax?: A_BusinessPartnerTaxNumber[]
    to_BusPartAddrDepdntTaxNmbr?: A_BusPartAddrDepdntTaxNmbr[]
    to_Customer?: A_Customer
    to_Supplier?: A_Supplier
  }

  export interface A_BusinessPartnerAddress {
    BusinessPartner?: A_BusinessPartner
    BusinessPartner_BusinessPartner?: string
    AddressID: string
    ValidityStartDate: Date
    ValidityEndDate: Date
    AuthorizationGroup: string
    AddressUUID: string
    AdditionalStreetPrefixName: string
    AdditionalStreetSuffixName: string
    AddressTimeZone: string
    CareOfName: string
    CityCode: string
    CityName: string
    CompanyPostalCode: string
    Country: string
    County: string
    DeliveryServiceNumber: string
    DeliveryServiceTypeCode: string
    District: string
    FormOfAddress: string
    FullName: string
    HomeCityName: string
    HouseNumber: string
    HouseNumberSupplementText: string
    Language: string
    POBox: string
    POBoxDeviatingCityName: string
    POBoxDeviatingCountry: string
    POBoxDeviatingRegion: string
    POBoxIsWithoutNumber: boolean
    POBoxLobbyName: string
    POBoxPostalCode: string
    Person: string
    PostalCode: string
    PrfrdCommMediumType: string
    Region: string
    StreetName: string
    StreetPrefixName: string
    StreetSuffixName: string
    TaxJurisdiction: string
    TransportZone: string
    AddressIDByExternalSystem: string
    CountyCode: string
    TownshipCode: string
    TownshipName: string
    to_AddressUsage?: A_BuPaAddressUsage[]
    to_BPAddrDepdntIntlLocNumber?: A_BPAddrDepdntIntlLocNumber
    to_EmailAddress?: A_AddressEmailAddress[]
    to_FaxNumber?: A_AddressFaxNumber[]
    to_MobilePhoneNumber?: A_AddressPhoneNumber[]
    to_PhoneNumber?: A_AddressPhoneNumber[]
    to_URLAddress?: A_AddressHomePageURL[]
  }

  export interface A_BusinessPartnerBank {
    BusinessPartner: string
    BankIdentification: string
    BankCountryKey: string
    BankName: string
    BankNumber: string
    SWIFTCode: string
    BankControlKey: string
    BankAccountHolderName: string
    BankAccountName: string
    ValidityStartDate: Date
    ValidityEndDate: Date
    IBAN: string
    IBANValidityStartDate: Date
    BankAccount: string
    BankAccountReferenceText: string
    CollectionAuthInd: boolean
    CityName: string
    AuthorizationGroup: string
  }

  export interface A_BusinessPartnerContact {
    RelationshipNumber: string
    BusinessPartnerCompany: string
    BusinessPartnerPerson: string
    ValidityEndDate: Date
    ValidityStartDate: Date
    IsStandardRelationship: boolean
    RelationshipCategory: string
    to_ContactAddress?: A_BPContactToAddress[]
    to_ContactRelationship?: A_BPContactToFuncAndDept
  }

  export interface A_BusinessPartnerRole {
    BusinessPartner: string
    BusinessPartnerRole: string
    ValidFrom: Date
    ValidTo: Date
    AuthorizationGroup: string
  }

  export interface A_BusinessPartnerTaxNumber {
    BusinessPartner: string
    BPTaxType: string
    BPTaxNumber: string
    BPTaxLongNumber: string
    AuthorizationGroup: string
  }

  export interface A_BusPartAddrDepdntTaxNmbr {
    BusinessPartner: string
    AddressID: string
    BPTaxType: string
    BPTaxNumber: string
    BPTaxLongNumber: string
    AuthorizationGroup: string
  }

  export interface A_CustAddrDepdntExtIdentifier {
    Customer: string
    AddressID: string
    CustomerExternalRefID: string
  }

  export interface A_CustAddrDepdntInformation {
    Customer: string
    AddressID: string
    ExpressTrainStationName: string
    TrainStationName: string
    CityCode: string
    County: string
  }

  export interface A_Customer {
    Customer: string
    AuthorizationGroup: string
    BillingIsBlockedForCustomer: string
    CreatedByUser: string
    CreationDate: Date
    CustomerAccountGroup: string
    CustomerClassification: string
    CustomerFullName: string
    CustomerName: string
    DeliveryIsBlocked: string
    NFPartnerIsNaturalPerson: string
    OrderIsBlockedForCustomer: string
    PostingIsBlocked: boolean
    Supplier: string
    CustomerCorporateGroup: string
    FiscalAddress: string
    Industry: string
    IndustryCode1: string
    IndustryCode2: string
    IndustryCode3: string
    IndustryCode4: string
    IndustryCode5: string
    InternationalLocationNumber1: string
    NielsenRegion: string
    ResponsibleType: string
    TaxNumber1: string
    TaxNumber2: string
    TaxNumber3: string
    TaxNumber4: string
    TaxNumber5: string
    TaxNumberType: string
    VATRegistration: string
    DeletionIndicator: boolean
    ExpressTrainStationName: string
    TrainStationName: string
    CityCode: string
    County: string
    to_CustAddrDepdntExtIdentifier?: A_CustAddrDepdntExtIdentifier[]
    to_CustAddrDepdntInformation?: A_CustAddrDepdntInformation[]
    to_CustomerCompany?: A_CustomerCompany[]
    to_CustomerSalesArea?: A_CustomerSalesArea[]
    to_CustomerTaxGrouping?: A_CustomerTaxGrouping[]
    to_CustomerText?: A_CustomerText[]
    to_CustomerUnloadingPoint?: A_CustomerUnloadingPoint[]
    to_CustUnldgPtAddrDepdntInfo?: A_CustUnldgPtAddrDepdntInfo[]
  }

  export interface A_CustomerCompany {
    Customer: string
    CompanyCode: string
    APARToleranceGroup: string
    AccountByCustomer: string
    AccountingClerk: string
    AccountingClerkFaxNumber: string
    AccountingClerkInternetAddress: string
    AccountingClerkPhoneNumber: string
    AlternativePayerAccount: string
    AuthorizationGroup: string
    CollectiveInvoiceVariant: string
    CustomerAccountNote: string
    CustomerHeadOffice: string
    CustomerSupplierClearingIsUsed: boolean
    HouseBank: string
    InterestCalculationCode: string
    InterestCalculationDate: Date
    IntrstCalcFrequencyInMonths: string
    IsToBeLocallyProcessed: boolean
    ItemIsToBePaidSeparately: boolean
    LayoutSortingRule: string
    PaymentBlockingReason: string
    PaymentMethodsList: string
    PaymentTerms: string
    PaytAdviceIsSentbyEDI: boolean
    PhysicalInventoryBlockInd: boolean
    ReconciliationAccount: string
    RecordPaymentHistoryIndicator: boolean
    UserAtCustomer: string
    DeletionIndicator: boolean
    CashPlanningGroup: string
    KnownOrNegotiatedLeave: string
    ValueAdjustmentKey: string
    CustomerAccountGroup: string
    to_CompanyText?: A_CustomerCompanyText[]
    to_CustomerDunning?: A_CustomerDunning[]
    to_WithHoldingTax?: A_CustomerWithHoldingTax[]
  }

  export interface A_CustomerCompanyText {
    Customer: string
    CompanyCode: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_CustomerDunning {
    Customer: string
    CompanyCode: string
    DunningArea: string
    DunningBlock: string
    DunningLevel: string
    DunningProcedure: string
    DunningRecipient: string
    LastDunnedOn: Date
    LegDunningProcedureOn: Date
    DunningClerk: string
    AuthorizationGroup: string
    CustomerAccountGroup: string
  }

  export interface A_CustomerSalesArea {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    AccountByCustomer: string
    AuthorizationGroup: string
    BillingIsBlockedForCustomer: string
    CompleteDeliveryIsDefined: boolean
    Currency: string
    CustomerABCClassification: string
    CustomerAccountAssignmentGroup: string
    CustomerGroup: string
    CustomerPaymentTerms: string
    CustomerPriceGroup: string
    CustomerPricingProcedure: string
    DeliveryIsBlockedForCustomer: string
    DeliveryPriority: string
    IncotermsClassification: string
    IncotermsLocation2: string
    IncotermsVersion: string
    IncotermsLocation1: string
    DeletionIndicator: boolean
    IncotermsTransferLocation: string
    InvoiceDate: string
    ItemOrderProbabilityInPercent: string
    OrderCombinationIsAllowed: boolean
    OrderIsBlockedForCustomer: string
    PartialDeliveryIsAllowed: string
    PriceListType: string
    SalesGroup: string
    SalesOffice: string
    ShippingCondition: string
    SupplyingPlant: string
    SalesDistrict: string
    InvoiceListSchedule: string
    ExchangeRateType: string
    AdditionalCustomerGroup1: string
    AdditionalCustomerGroup2: string
    AdditionalCustomerGroup3: string
    AdditionalCustomerGroup4: string
    AdditionalCustomerGroup5: string
    PaymentGuaranteeProcedure: string
    CustomerAccountGroup: string
    to_PartnerFunction?: A_CustSalesPartnerFunc[]
    to_SalesAreaTax?: A_CustomerSalesAreaTax[]
    to_SalesAreaText?: A_CustomerSalesAreaText[]
    to_SlsAreaAddrDepdntInfo?: A_CustSlsAreaAddrDepdntInfo[]
  }

  export interface A_CustomerSalesAreaTax {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    DepartureCountry: string
    CustomerTaxCategory: string
    CustomerTaxClassification: string
    to_SlsAreaAddrDepdntTax?: A_CustSlsAreaAddrDepdntTaxInfo[]
  }

  export interface A_CustomerSalesAreaText {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_CustomerTaxGrouping {
    Customer: string
    CustomerTaxGroupingCode: string
    CustTaxGrpExemptionCertificate: string
    CustTaxGroupExemptionRate: number
    CustTaxGroupExemptionStartDate: Date
    CustTaxGroupExemptionEndDate: Date
    CustTaxGroupSubjectedStartDate: Date
    CustTaxGroupSubjectedEndDate: Date
  }

  export interface A_CustomerText {
    Customer: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_CustomerUnloadingPoint {
    Customer: string
    UnloadingPointName: string
    CustomerFactoryCalenderCode: string
    BPGoodsReceivingHoursCode: string
    IsDfltBPUnloadingPoint: boolean
    MondayMorningOpeningTime: Date
    MondayMorningClosingTime: Date
    MondayAfternoonOpeningTime: Date
    MondayAfternoonClosingTime: Date
    TuesdayMorningOpeningTime: Date
    TuesdayMorningClosingTime: Date
    TuesdayAfternoonOpeningTime: Date
    TuesdayAfternoonClosingTime: Date
    WednesdayMorningOpeningTime: Date
    WednesdayMorningClosingTime: Date
    WednesdayAfternoonOpeningTime: Date
    WednesdayAfternoonClosingTime: Date
    ThursdayMorningOpeningTime: Date
    ThursdayMorningClosingTime: Date
    ThursdayAfternoonOpeningTime: Date
    ThursdayAfternoonClosingTime: Date
    FridayMorningOpeningTime: Date
    FridayMorningClosingTime: Date
    FridayAfternoonOpeningTime: Date
    FridayAfternoonClosingTime: Date
    SaturdayMorningOpeningTime: Date
    SaturdayMorningClosingTime: Date
    SaturdayAfternoonOpeningTime: Date
    SaturdayAfternoonClosingTime: Date
    SundayMorningOpeningTime: Date
    SundayMorningClosingTime: Date
    SundayAfternoonOpeningTime: Date
    SundayAfternoonClosingTime: Date
  }

  export interface A_CustomerWithHoldingTax {
    Customer: string
    CompanyCode: string
    WithholdingTaxType: string
    WithholdingTaxCode: string
    WithholdingTaxAgent: boolean
    ObligationDateBegin: Date
    ObligationDateEnd: Date
    WithholdingTaxNumber: string
    WithholdingTaxCertificate: string
    WithholdingTaxExmptPercent: number
    ExemptionDateBegin: Date
    ExemptionDateEnd: Date
    ExemptionReason: string
    AuthorizationGroup: string
  }

  export interface A_CustSalesPartnerFunc {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    PartnerCounter: string
    PartnerFunction: string
    BPCustomerNumber: string
    CustomerPartnerDescription: string
    DefaultPartner: boolean
    Supplier: string
    PersonnelNumber: string
    ContactPerson: string
    AddressID: string
    AuthorizationGroup: string
  }

  export interface A_CustSlsAreaAddrDepdntInfo {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    AddressID: string
    IncotermsClassification: string
    IncotermsLocation1: string
    IncotermsLocation2: string
    DeliveryIsBlocked: string
    SalesOffice: string
    SalesGroup: string
    ShippingCondition: string
    SupplyingPlant: string
    IncotermsVersion: string
  }

  export interface A_CustSlsAreaAddrDepdntTaxInfo {
    Customer: string
    SalesOrganization: string
    DistributionChannel: string
    Division: string
    AddressID: string
    DepartureCountry: string
    CustomerTaxCategory: string
    CustomerTaxClassification: string
  }

  export interface A_CustUnldgPtAddrDepdntInfo {
    Customer: string
    AddressID: string
    UnloadingPointName: string
    CustomerFactoryCalenderCode: string
    BPGoodsReceivingHoursCode: string
    IsDfltBPUnloadingPoint: boolean
    MondayMorningOpeningTime: Date
    MondayMorningClosingTime: Date
    MondayAfternoonOpeningTime: Date
    MondayAfternoonClosingTime: Date
    TuesdayMorningOpeningTime: Date
    TuesdayMorningClosingTime: Date
    TuesdayAfternoonOpeningTime: Date
    TuesdayAfternoonClosingTime: Date
    WednesdayMorningOpeningTime: Date
    WednesdayMorningClosingTime: Date
    WednesdayAfternoonOpeningTime: Date
    WednesdayAfternoonClosingTime: Date
    ThursdayMorningOpeningTime: Date
    ThursdayMorningClosingTime: Date
    ThursdayAfternoonOpeningTime: Date
    ThursdayAfternoonClosingTime: Date
    FridayMorningOpeningTime: Date
    FridayMorningClosingTime: Date
    FridayAfternoonOpeningTime: Date
    FridayAfternoonClosingTime: Date
    SaturdayMorningOpeningTime: Date
    SaturdayMorningClosingTime: Date
    SaturdayAfternoonOpeningTime: Date
    SaturdayAfternoonClosingTime: Date
    SundayMorningOpeningTime: Date
    SundayMorningClosingTime: Date
    SundayAfternoonOpeningTime: Date
    SundayAfternoonClosingTime: Date
  }

  export interface A_Supplier {
    Supplier: string
    AlternativePayeeAccountNumber: string
    AuthorizationGroup: string
    CreatedByUser: string
    CreationDate: Date
    Customer: string
    PaymentIsBlockedForSupplier: boolean
    PostingIsBlocked: boolean
    PurchasingIsBlocked: boolean
    SupplierAccountGroup: string
    SupplierFullName: string
    SupplierName: string
    VATRegistration: string
    BirthDate: Date
    ConcatenatedInternationalLocNo: string
    DeletionIndicator: boolean
    FiscalAddress: string
    Industry: string
    InternationalLocationNumber1: string
    InternationalLocationNumber2: string
    InternationalLocationNumber3: string
    IsNaturalPerson: string
    ResponsibleType: string
    SuplrQltyInProcmtCertfnValidTo: Date
    SuplrQualityManagementSystem: string
    SupplierCorporateGroup: string
    SupplierProcurementBlock: string
    TaxNumber1: string
    TaxNumber2: string
    TaxNumber3: string
    TaxNumber4: string
    TaxNumber5: string
    TaxNumberResponsible: string
    TaxNumberType: string
    SuplrProofOfDelivRlvtCode: string
    BR_TaxIsSplit: boolean
    DataExchangeInstructionKey: string
    to_SupplierCompany?: A_SupplierCompany[]
    to_SupplierPurchasingOrg?: A_SupplierPurchasingOrg[]
    to_SupplierText?: A_SupplierText[]
  }

  export interface A_SupplierCompany {
    Supplier: string
    CompanyCode: string
    AuthorizationGroup: string
    CompanyCodeName: string
    PaymentBlockingReason: string
    SupplierIsBlockedForPosting: boolean
    AccountingClerk: string
    AccountingClerkFaxNumber: string
    AccountingClerkPhoneNumber: string
    SupplierClerk: string
    SupplierClerkURL: string
    PaymentMethodsList: string
    PaymentTerms: string
    ClearCustomerSupplier: boolean
    IsToBeLocallyProcessed: boolean
    ItemIsToBePaidSeparately: boolean
    PaymentIsToBeSentByEDI: boolean
    HouseBank: string
    CheckPaidDurationInDays: number
    Currency: string
    BillOfExchLmtAmtInCoCodeCrcy: number
    SupplierClerkIDBySupplier: string
    ReconciliationAccount: string
    InterestCalculationCode: string
    InterestCalculationDate: Date
    IntrstCalcFrequencyInMonths: string
    SupplierHeadOffice: string
    AlternativePayee: string
    LayoutSortingRule: string
    APARToleranceGroup: string
    SupplierCertificationDate: Date
    SupplierAccountNote: string
    WithholdingTaxCountry: string
    DeletionIndicator: boolean
    CashPlanningGroup: string
    IsToBeCheckedForDuplicates: boolean
    MinorityGroup: string
    SupplierAccountGroup: string
    to_CompanyText?: A_SupplierCompanyText[]
    to_Supplier?: A_Supplier
    to_SupplierDunning?: A_SupplierDunning[]
    to_SupplierWithHoldingTax?: A_SupplierWithHoldingTax[]
  }

  export interface A_SupplierCompanyText {
    Supplier: string
    CompanyCode: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_SupplierDunning {
    Supplier: string
    CompanyCode: string
    DunningArea: string
    DunningBlock: string
    DunningLevel: string
    DunningProcedure: string
    DunningRecipient: string
    LastDunnedOn: Date
    LegDunningProcedureOn: Date
    DunningClerk: string
    AuthorizationGroup: string
    SupplierAccountGroup: string
  }

  export interface A_SupplierPartnerFunc {
    Supplier: string
    PurchasingOrganization: string
    SupplierSubrange: string
    Plant: string
    PartnerFunction: string
    PartnerCounter: string
    DefaultPartner: boolean
    CreationDate: Date
    CreatedByUser: string
    ReferenceSupplier: string
    AuthorizationGroup: string
  }

  export interface A_SupplierPurchasingOrg {
    Supplier: string
    PurchasingOrganization: string
    CalculationSchemaGroupCode: string
    DeletionIndicator: boolean
    IncotermsClassification: string
    IncotermsTransferLocation: string
    IncotermsVersion: string
    IncotermsLocation1: string
    IncotermsLocation2: string
    InvoiceIsGoodsReceiptBased: boolean
    MaterialPlannedDeliveryDurn: number
    MinimumOrderAmount: number
    PaymentTerms: string
    PricingDateControl: string
    PurOrdAutoGenerationIsAllowed: boolean
    PurchaseOrderCurrency: string
    PurchasingGroup: string
    PurchasingIsBlockedForSupplier: boolean
    ShippingCondition: string
    SupplierABCClassificationCode: string
    SupplierPhoneNumber: string
    SupplierRespSalesPersonName: string
    SupplierConfirmationControlKey: string
    IsOrderAcknRqd: boolean
    AuthorizationGroup: string
    SupplierAccountGroup: string
    to_PartnerFunction?: A_SupplierPartnerFunc[]
    to_PurchasingOrgText?: A_SupplierPurchasingOrgText[]
  }

  export interface A_SupplierPurchasingOrgText {
    Supplier: string
    PurchasingOrganization: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_SupplierText {
    Supplier: string
    Language: string
    LongTextID: string
    LongText: string
  }

  export interface A_SupplierWithHoldingTax {
    Supplier: string
    CompanyCode: string
    WithholdingTaxType: string
    ExemptionDateBegin: Date
    ExemptionDateEnd: Date
    ExemptionReason: string
    IsWithholdingTaxSubject: boolean
    RecipientType: string
    WithholdingTaxCertificate: string
    WithholdingTaxCode: string
    WithholdingTaxExmptPercent: number
    WithholdingTaxNumber: string
    AuthorizationGroup: string
  }

  export enum Entity {
    A_AddressEmailAddress = 'OP_API_BUSINESS_PARTNER_SRV.A_AddressEmailAddress',
    A_AddressFaxNumber = 'OP_API_BUSINESS_PARTNER_SRV.A_AddressFaxNumber',
    A_AddressHomePageURL = 'OP_API_BUSINESS_PARTNER_SRV.A_AddressHomePageURL',
    A_AddressPhoneNumber = 'OP_API_BUSINESS_PARTNER_SRV.A_AddressPhoneNumber',
    A_BPAddrDepdntIntlLocNumber = 'OP_API_BUSINESS_PARTNER_SRV.A_BPAddrDepdntIntlLocNumber',
    A_BPContactToAddress = 'OP_API_BUSINESS_PARTNER_SRV.A_BPContactToAddress',
    A_BPContactToFuncAndDept = 'OP_API_BUSINESS_PARTNER_SRV.A_BPContactToFuncAndDept',
    A_BuPaAddressUsage = 'OP_API_BUSINESS_PARTNER_SRV.A_BuPaAddressUsage',
    A_BuPaIdentification = 'OP_API_BUSINESS_PARTNER_SRV.A_BuPaIdentification',
    A_BuPaIndustry = 'OP_API_BUSINESS_PARTNER_SRV.A_BuPaIndustry',
    A_BusinessPartner = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartner',
    A_BusinessPartnerAddress = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartnerAddress',
    A_BusinessPartnerBank = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartnerBank',
    A_BusinessPartnerContact = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartnerContact',
    A_BusinessPartnerRole = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartnerRole',
    A_BusinessPartnerTaxNumber = 'OP_API_BUSINESS_PARTNER_SRV.A_BusinessPartnerTaxNumber',
    A_BusPartAddrDepdntTaxNmbr = 'OP_API_BUSINESS_PARTNER_SRV.A_BusPartAddrDepdntTaxNmbr',
    A_CustAddrDepdntExtIdentifier = 'OP_API_BUSINESS_PARTNER_SRV.A_CustAddrDepdntExtIdentifier',
    A_CustAddrDepdntInformation = 'OP_API_BUSINESS_PARTNER_SRV.A_CustAddrDepdntInformation',
    A_Customer = 'OP_API_BUSINESS_PARTNER_SRV.A_Customer',
    A_CustomerCompany = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerCompany',
    A_CustomerCompanyText = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerCompanyText',
    A_CustomerDunning = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerDunning',
    A_CustomerSalesArea = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerSalesArea',
    A_CustomerSalesAreaTax = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerSalesAreaTax',
    A_CustomerSalesAreaText = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerSalesAreaText',
    A_CustomerTaxGrouping = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerTaxGrouping',
    A_CustomerText = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerText',
    A_CustomerUnloadingPoint = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerUnloadingPoint',
    A_CustomerWithHoldingTax = 'OP_API_BUSINESS_PARTNER_SRV.A_CustomerWithHoldingTax',
    A_CustSalesPartnerFunc = 'OP_API_BUSINESS_PARTNER_SRV.A_CustSalesPartnerFunc',
    A_CustSlsAreaAddrDepdntInfo = 'OP_API_BUSINESS_PARTNER_SRV.A_CustSlsAreaAddrDepdntInfo',
    A_CustSlsAreaAddrDepdntTaxInfo = 'OP_API_BUSINESS_PARTNER_SRV.A_CustSlsAreaAddrDepdntTaxInfo',
    A_CustUnldgPtAddrDepdntInfo = 'OP_API_BUSINESS_PARTNER_SRV.A_CustUnldgPtAddrDepdntInfo',
    A_Supplier = 'OP_API_BUSINESS_PARTNER_SRV.A_Supplier',
    A_SupplierCompany = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierCompany',
    A_SupplierCompanyText = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierCompanyText',
    A_SupplierDunning = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierDunning',
    A_SupplierPartnerFunc = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierPartnerFunc',
    A_SupplierPurchasingOrg = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierPurchasingOrg',
    A_SupplierPurchasingOrgText = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierPurchasingOrgText',
    A_SupplierText = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierText',
    A_SupplierWithHoldingTax = 'OP_API_BUSINESS_PARTNER_SRV.A_SupplierWithHoldingTax'
  }

  export enum SanitizedEntity {
    A_AddressEmailAddress = 'A_AddressEmailAddress',
    A_AddressFaxNumber = 'A_AddressFaxNumber',
    A_AddressHomePageURL = 'A_AddressHomePageURL',
    A_AddressPhoneNumber = 'A_AddressPhoneNumber',
    A_BPAddrDepdntIntlLocNumber = 'A_BPAddrDepdntIntlLocNumber',
    A_BPContactToAddress = 'A_BPContactToAddress',
    A_BPContactToFuncAndDept = 'A_BPContactToFuncAndDept',
    A_BuPaAddressUsage = 'A_BuPaAddressUsage',
    A_BuPaIdentification = 'A_BuPaIdentification',
    A_BuPaIndustry = 'A_BuPaIndustry',
    A_BusinessPartner = 'A_BusinessPartner',
    A_BusinessPartnerAddress = 'A_BusinessPartnerAddress',
    A_BusinessPartnerBank = 'A_BusinessPartnerBank',
    A_BusinessPartnerContact = 'A_BusinessPartnerContact',
    A_BusinessPartnerRole = 'A_BusinessPartnerRole',
    A_BusinessPartnerTaxNumber = 'A_BusinessPartnerTaxNumber',
    A_BusPartAddrDepdntTaxNmbr = 'A_BusPartAddrDepdntTaxNmbr',
    A_CustAddrDepdntExtIdentifier = 'A_CustAddrDepdntExtIdentifier',
    A_CustAddrDepdntInformation = 'A_CustAddrDepdntInformation',
    A_Customer = 'A_Customer',
    A_CustomerCompany = 'A_CustomerCompany',
    A_CustomerCompanyText = 'A_CustomerCompanyText',
    A_CustomerDunning = 'A_CustomerDunning',
    A_CustomerSalesArea = 'A_CustomerSalesArea',
    A_CustomerSalesAreaTax = 'A_CustomerSalesAreaTax',
    A_CustomerSalesAreaText = 'A_CustomerSalesAreaText',
    A_CustomerTaxGrouping = 'A_CustomerTaxGrouping',
    A_CustomerText = 'A_CustomerText',
    A_CustomerUnloadingPoint = 'A_CustomerUnloadingPoint',
    A_CustomerWithHoldingTax = 'A_CustomerWithHoldingTax',
    A_CustSalesPartnerFunc = 'A_CustSalesPartnerFunc',
    A_CustSlsAreaAddrDepdntInfo = 'A_CustSlsAreaAddrDepdntInfo',
    A_CustSlsAreaAddrDepdntTaxInfo = 'A_CustSlsAreaAddrDepdntTaxInfo',
    A_CustUnldgPtAddrDepdntInfo = 'A_CustUnldgPtAddrDepdntInfo',
    A_Supplier = 'A_Supplier',
    A_SupplierCompany = 'A_SupplierCompany',
    A_SupplierCompanyText = 'A_SupplierCompanyText',
    A_SupplierDunning = 'A_SupplierDunning',
    A_SupplierPartnerFunc = 'A_SupplierPartnerFunc',
    A_SupplierPurchasingOrg = 'A_SupplierPurchasingOrg',
    A_SupplierPurchasingOrgText = 'A_SupplierPurchasingOrgText',
    A_SupplierText = 'A_SupplierText',
    A_SupplierWithHoldingTax = 'A_SupplierWithHoldingTax'
  }
}

export type User = string

export enum Entity {}

export enum SanitizedEntity {}
