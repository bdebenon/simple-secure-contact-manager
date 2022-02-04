import {Contact} from "@/domain/contacts/models";
import {jsonReviver} from "@/common/utils";

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

    static emptyContactList() {
        let contacts = new Map<string, Contact>()
        return new ContactList({
            contacts: contacts
        })
    }

    static fromJSONString(jsonString: string): ContactList {
        const contactListJSON = JSON.parse(jsonString, jsonReviver);
        const contacts: Map<string, Contact> = new Map<string, Contact>()
        const contactListIsEmpty = contactListJSON.contacts.size === 0

        if (!contactListIsEmpty) {
            contactListJSON.contacts.forEach((value: Contact, key: string) => {
                const contact = new Contact({
                    uuid: value.uuid,
                    firstName: value.firstName,
                    middleName: value.middleName,
                    lastName: value.lastName,
                    phoneNumber: value.phoneNumber,
                    emailAddress: value.emailAddress,
                    homeAddress: value.homeAddress
                })
                contacts.set(contact.uuid, contact)
            });
        }

        const contactList = new ContactList({
            contacts: contacts
        })
        return contactList
    }
}

