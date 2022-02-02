import {ContactFaker} from "@/domain/contacts/faker";

describe('contact model', () => {
    it('should create an instance of a Contact model', () => {
        const contact = new ContactFaker().contact()
        expect(typeof contact.firstName).toBe('string')
        expect(typeof contact.lastName).toBe('string')
        expect(typeof contact.middleName).toBe('string')
        expect(typeof contact.phoneNumber).toBe('string')
        expect(typeof contact.emailAddress).toBe('string')
        expect(typeof contact.homeAddress).toBe('string')
    })
})