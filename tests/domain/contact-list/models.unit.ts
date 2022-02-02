import {ContactListFaker} from "@/domain/contact-lists/faker";
import {ContactFaker} from "@/domain/contacts/faker";

describe('contact list model.ts', () => {
    it('should create a ContactList using ContactListFaker without specifying how many to make', () => {
        const contactList = new ContactListFaker().contactList()
        for (let contact of contactList.contacts.values()) {
            expect(typeof contact.firstName).toBe('string')
            expect(typeof contact.lastName).toBe('string')
            expect(typeof contact.middleName).toBe('string')
            expect(typeof contact.phoneNumber).toBe('string')
            expect(typeof contact.emailAddress).toBe('string')
            expect(typeof contact.homeAddress).toBe('string')
        }
    })

    it('should create a ContactList using ContactListFaker without specifying how many to make', () => {
        const numberOfContacts = 10
        const contactList = new ContactListFaker().contactList({numberOfContacts: numberOfContacts})
        expect(contactList.numberOfContacts).toBe(numberOfContacts)
    })

    describe('getContact()', () => {
        it('should create a contact list with 1 member and then retrieve that member via UUID with getContact',
            () => {
                const numberOfContacts = 1
                const contactList = new ContactListFaker().contactList({numberOfContacts: numberOfContacts})
                const [expectedContact] = contactList.contacts.values();
                const contactUUID = expectedContact.uuid
                const retrievedContact = contactList.getContact(contactUUID)

                expect(expectedContact).toStrictEqual(retrievedContact)
            })
    })

    describe('addContact()', () => {
        it('should create a contact list and then add a contact to it', () => {
            const numberOfContacts = 0
            const contactList = new ContactListFaker().contactList({numberOfContacts: numberOfContacts})

            const newContact = new ContactFaker().contact()
            contactList.addContact(newContact)

            expect(contactList.numberOfContacts).toBe(1)
        })
    })

    describe('updateContact()', () => {
        it('should create a contact list with 1 contact then update that contact and check that it was updated0',
            () => {
                const numberOfContacts = 1
                const contactList = new ContactListFaker().contactList({numberOfContacts: numberOfContacts})
                const [contact] = contactList.contacts.values();
                const contactUUID = contact.uuid

                const updatedEmail = 'jerome.powell@finance.com'

                const retrievedContact = contactList.getContact(contactUUID)
                if (retrievedContact != undefined) {  // TODO: Figure out a better way to edit these Contact fields
                    retrievedContact.emailAddress = updatedEmail
                }

                expect(contactList.getContact(contact.uuid)?.emailAddress).toBe(updatedEmail)
            })
    })

    describe('deleteContact()', () => {
        it('should create a contact list with 1 contact then update that contact and check that it was updated0',
            () => {
                const numberOfContacts = 1
                const contactList = new ContactListFaker().contactList({numberOfContacts: numberOfContacts})
                const [contact] = contactList.contacts.values();
                const contactUUID = contact.uuid

                contactList.deleteContact(contactUUID)

                expect(contactList.numberOfContacts).toBe(0)
            })
    })
})