import {ContactListFaker} from "@/domain/contact-lists/faker";
import {ContactList} from "@/domain/contact-lists/models";
import {
    SearchContactListByStringUseCase
} from "@/domain/contact-lists/use-cases/search-contact-list-by-string-use-case";
import {Contact} from "@/domain/contacts/models";


describe('search contact list by string use case', () => {
    it('should create a contact list and then search it via string and find a match', () => {
        const contactList: ContactList = new ContactListFaker().contactList()
        const [contactToFind] = contactList.contacts.values()
        const foundContactArray: Array<Contact> = new SearchContactListByStringUseCase().execute(
            {contactList: contactList, searchString: contactToFind.firstName}
        )
        expect(foundContactArray.includes(contactToFind)).toBe(true)
    })
})