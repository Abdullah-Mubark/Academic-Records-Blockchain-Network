export class Issuer {
    crNumber: string;
    issuerName: string;
    type: IssuerType;

    constructor(crNumber: string,
        issuerName: string,
        type: IssuerType) {
        this.crNumber = crNumber;
        this.issuerName = issuerName;
        this.type = type;
    }
}

export enum IssuerType {
    University ,
    College , 
    Academy ,
    HighSchool ,
    MiddleSchool ,
    ElementrySchoo,
}