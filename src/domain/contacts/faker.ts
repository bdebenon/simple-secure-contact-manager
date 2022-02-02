// @ts-ignore
import faker from 'faker';

import {Contact} from "@/domain/contacts/models";
import {v4 as uuidv4} from 'uuid';

interface ContactFakerDTO {
    uuid: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    homeAddress: string;
}

export class ContactFaker {
    contact(p?: ContactFakerDTO): Contact {

        const uuid = uuidv4()
        const firstName = faker.name.firstName()
        const middleName = faker.name.firstName()
        const lastName = faker.name.lastName()
        const phoneNumber = faker.phone.phoneNumberFormat()
        const emailAddress = firstName + lastName + '@yahoo.com'
        const homeAddress = faker.address.streetAddress(true)
        return new Contact({
                uuid: p === undefined || p.uuid == null ? uuid : p.uuid,
                firstName: p === undefined || p.firstName == null ? firstName : p.firstName,
                middleName: p === undefined || p.middleName == null ? middleName : p.middleName,
                lastName: p === undefined || p.lastName == null ? lastName : p.lastName,
                phoneNumber: p === undefined || p.phoneNumber == null ? phoneNumber : p.phoneNumber,
                emailAddress: p === undefined || p.emailAddress == null ? emailAddress : p.emailAddress,
                homeAddress: p === undefined || p.homeAddress == null ? homeAddress : p.homeAddress,
            }
        )
    }
}