export interface DataCountries {
    Count: number;
    Data:  Countries[];
}

export interface Countries {
    Code:      string;
    Code3:     null | string;
    Name:      string;
    PhoneCode: null | string;
}