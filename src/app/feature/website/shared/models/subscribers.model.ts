export interface DataSubscriber {
    Count: number;
    Data:  Subscribers[];
}

export interface Subscribers {
    SystemId:                     null;
    Area:                         string;
    PublicId:                     number;
    CountryCode:                  string;
    CountryName:                  string;
    Name:                         string;
    EndpointsCount:               number;
    Email:                        string;
    JobTitle:                     string;
    PhoneNumber:                  string;
    PhoneCode:                    string;
    PhoneCodeAndNumber:           string;
    LastActivityUtc:              null;
    LastActivity:                 null;
    LastActivityString:           null;
    SubscriptionDate:             null;
    SubscriptionMethod:           number;
    SubscriptionState:            number;
    SubscriptionStateDescription: string;
    Topics:                       any[];
    ValidEmail:                   boolean;
    Activity:                     string;
    ConnectionState:              number;
    Id:                           number;
}