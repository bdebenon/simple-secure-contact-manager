// @ts-ignore
import faker from 'faker';
import {ContactFaker} from "@/domain/contacts/faker";
import {Contact} from "@/domain/contacts/models";
import {ContactList} from "@/domain/contact-lists/models";


interface ContactListFakerParameters {
    numberOfContacts?: number;
}

export class ContactListFaker {
    contactList(p?: ContactListFakerParameters): ContactList {
        const defaultNumberOfContacts = 5
        const numberOfContacts = p == undefined || p.numberOfContacts == null ? defaultNumberOfContacts :
            p.numberOfContacts
        let contacts = new Map<string, Contact>()

        // More concise way to add 'numberOfContacts' contacts to the contacts map
        // If this is not understandable, we can swap this out for something less compact
        const _ = [...Array(numberOfContacts).keys()].map(() => {
            const contact = new ContactFaker().contact();
            contacts.set(contact.uuid, contact)
        })

        return new ContactList({contacts: contacts})
    }
}