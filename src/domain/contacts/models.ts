interface ContactDTO {
    uuid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    homeAddress: string;
}

export class Contact implements ContactDTO {
    uuid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    homeAddress: string;

    constructor(params: ContactDTO) {
        this.uuid = params.uuid
        this.firstName = params.firstName
        this.middleName = params.middleName
        this.lastName = params.lastName
        this.phoneNumber = params.phoneNumber
        this.emailAddress = params.emailAddress
        this.homeAddress = params.homeAddress
    }

    toJSON() {
        return {
            uuid: this.uuid,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress,
            homeAddress: this.homeAddress
        }
    }
}