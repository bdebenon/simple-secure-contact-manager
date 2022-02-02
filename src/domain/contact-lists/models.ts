import {Contact} from "../contacts/models";

interface ContactListParameters {
    contacts: Map<string, Contact>;
}

export class ContactList implements ContactListParameters {
    contacts: Map<string, Contact>;

    constructor(params: ContactListParameters) {
        this.contacts = params.contacts
    }

    get numberOfContacts(): number {
        return this.contacts.size
    }

    /** getContact returns a reference to a Contact object held in the contacts map
     *  or undefined if the Contact does not exist */
    getContact(contactUUID: string): Contact | undefined {
        return this.contacts.get(contactUUID)
    }

    addContact(contact: Contact) {
        this.contacts.set(contact.uuid, contact)
    }

    deleteContact(contactUUID: string) {
        this.contacts.delete(contactUUID)
    }

    toJSON() {
        const contactJSONs: string[] = []
        this.contacts.forEach((value: Contact, key: string) => {
            contactJSONs.push(JSON.stringify(value))
        });
        return {
            contacts: contactJSONs
        }
    }

    static fromJSONString(jsonString: string): ContactList {
        const contactListJSON = JSON.parse(jsonString);

        const contacts: Map<string, Contact> = new Map<string, Contact>()
        contactListJSON.contacts.forEach((value: string, key: string) => {
            const contactJSON = JSON.parse(value)
            const contact = new Contact({
                uuid: contactJSON.uuid,
                firstName: contactJSON.firstName,
                middleName: contactJSON.middleName,
                lastName: contactJSON.lastName,
                phoneNumber: contactJSON.phoneNumber,
                emailAddress: contactJSON.emailAddress,
                homeAddress: contactJSON.homeAddress
            })
            contacts.set(contact.uuid, contact)
        });

        const contactList = new ContactList({
            contacts: contacts
        })
        return contactList
    }
}