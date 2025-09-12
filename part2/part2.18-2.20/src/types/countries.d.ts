export interface ICountry {
    name:         Name;
    tld?:         string[];
    cca2:         string;
    ccn3?:        string;
    cca3:         string;
    cioc?:        string;
    independent?: boolean;
    status:       Status;
    unMember:     boolean;
    currencies?:  Currencies;
    idd:          Idd;
    capital?:     string[];
    altSpellings: string[];
    region:       Region;
    subregion?:   string;
    languages?:   { [key: string]: string };
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders?:     string[];
    area:         number;
    demonyms?:    Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    fifa?:        string;
    car:          Car;
    timezones:    string[];
    continents:   Continent[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
    gini?:        { [key: string]: number };
}

export interface CapitalInfo {
    latlng?: number[];
}

export interface Car {
    signs?: string[];
    side:   Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum Continent {
    Africa = "Africa",
    Antarctica = "Antarctica",
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "North America",
    Oceania = "Oceania",
    SouthAmerica = "South America",
}

export interface Currencies {
    KWD?: Aed;
    EUR?: Aed;
    TND?: Aed;
    JPY?: Aed;
    GYD?: Aed;
    GBP?: Aed;
    SHP?: Aed;
    GTQ?: Aed;
    VES?: Aed;
    CVE?: Aed;
    AZN?: Aed;
    GGP?: Aed;
    KES?: Aed;
    SSP?: Aed;
    MMK?: Aed;
    CHF?: Aed;
    AUD?: Aed;
    CRC?: Aed;
    EGP?: Aed;
    ILS?: Aed;
    JOD?: Aed;
    XOF?: Aed;
    SLL?: Aed;
    PHP?: Aed;
    RUB?: Aed;
    HTG?: Aed;
    KRW?: Aed;
    WST?: Aed;
    AWG?: Aed;
    AFN?: Aed;
    BSD?: Aed;
    USD?: Aed;
    GEL?: Aed;
    KYD?: Aed;
    MKD?: Aed;
    SYP?: Aed;
    HKD?: Aed;
    CLP?: Aed;
    ZWL?: Aed;
    CAD?: Aed;
    XAF?: Aed;
    SZL?: Aed;
    ZAR?: Aed;
    OMR?: Aed;
    RON?: Aed;
    MZN?: Aed;
    TTD?: Aed;
    BHD?: Aed;
    LBP?: Aed;
    BDT?: Aed;
    ETB?: Aed;
    PEN?: Aed;
    MUR?: Aed;
    CUC?: Aed;
    CUP?: Aed;
    VND?: Aed;
    XCD?: Aed;
    BZD?: Aed;
    CNY?: Aed;
    THB?: Aed;
    KMF?: Aed;
    LAK?: Aed;
    SRD?: Aed;
    GMD?: Aed;
    MVR?: Aed;
    TOP?: Aed;
    GNF?: Aed;
    ANG?: Aed;
    PAB?: Aed;
    PGK?: Aed;
    XPF?: Aed;
    KHR?: Aed;
    NIO?: Aed;
    COP?: Aed;
    MRU?: Aed;
    BWP?: Aed;
    FJD?: Aed;
    NOK?: Aed;
    BMD?: Aed;
    UGX?: Aed;
    BAM?: BAM;
    KZT?: Aed;
    NZD?: Aed;
    SDG?: BAM;
    QAR?: Aed;
    BBD?: Aed;
    TRY?: Aed;
    DKK?: Aed;
    YER?: Aed;
    STN?: Aed;
    TMT?: Aed;
    KPW?: Aed;
    ERN?: Aed;
    GIP?: Aed;
    MNT?: Aed;
    MWK?: Aed;
    TVD?: Aed;
    MDL?: Aed;
    BND?: Aed;
    SGD?: Aed;
    GHS?: Aed;
    DOP?: Aed;
    CZK?: Aed;
    MAD?: Aed;
    HNL?: Aed;
    MGA?: Aed;
    AMD?: Aed;
    FKP?: Aed;
    AOA?: Aed;
    IDR?: Aed;
    UZS?: Aed;
    BIF?: Aed;
    ALL?: Aed;
    BOB?: Aed;
    KGS?: Aed;
    AED?: Aed;
    PYG?: Aed;
    TZS?: Aed;
    ARS?: Aed;
    PKR?: Aed;
    NPR?: Aed;
    SEK?: Aed;
    UYU?: Aed;
    MXN?: Aed;
    SOS?: Aed;
    SCR?: Aed;
    BTN?: Aed;
    INR?: Aed;
    RWF?: Aed;
    HUF?: Aed;
    ISK?: Aed;
    FOK?: Aed;
    DJF?: Aed;
    LRD?: Aed;
    TWD?: Aed;
    LYD?: Aed;
    KID?: Aed;
    CKD?: Aed;
    LSL?: Aed;
    MYR?: Aed;
    SAR?: Aed;
    BGN?: Aed;
    BRL?: Aed;
    JEP?: Aed;
    DZD?: Aed;
    SBD?: Aed;
    LKR?: Aed;
    NGN?: Aed;
    NAD?: Aed;
    BYN?: Aed;
    UAH?: Aed;
    JMD?: Aed;
    ZMW?: Aed;
    IRR?: Aed;
    IQD?: Aed;
    IMP?: Aed;
    MOP?: Aed;
    PLN?: Aed;
    RSD?: Aed;
    CDF?: Aed;
    TJS?: Aed;
    VUV?: Aed;
}

export interface Aed {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png:  string;
    svg:  string;
    alt?: string;
}

export interface Idd {
    root?:     string;
    suffixes?: string[];
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:      string;
    official:    string;
    nativeName?: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex?: string;
}

export enum Region {
    Africa = "Africa",
    Americas = "Americas",
    Antarctic = "Antarctic",
    Asia = "Asia",
    Europe = "Europe",
    Oceania = "Oceania",
}

export enum StartOfWeek {
    Monday = "monday",
    Saturday = "saturday",
    Sunday = "sunday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}
