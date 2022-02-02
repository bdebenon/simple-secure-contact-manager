import {UserFaker} from "@/domain/users/faker";
import {ContactListFaker} from "@/domain/contact-lists/faker";
import {LocalFileContactListsRepository} from "@/infra/contact-lists/local-file-contact-lists-repository";
import {ContactList} from "@/domain/contact-lists/models";

describe('LocalFileContactListsRepository', () => {
    const password = 'Password1234!'

    describe('storeContactList()', () => {
        it('should create a contactList and User and then encrypt the contactList using the User Hash', async () => {
            const user = new UserFaker().user({password: password})
            const contactList = new ContactListFaker().contactList({numberOfContacts: 20})
            const contactListsRepository = new LocalFileContactListsRepository()
            const success = await contactListsRepository.storeContactList(user, contactList)
            expect(success).toBe(true)
        })
    })

    describe('getContactList()', () => {
        it('should fetch the contactList stored by the storeContactList using the User Hash', async () => {
            const user = new UserFaker().user({password: password})
            const contactListsRepository = new LocalFileContactListsRepository()
            const contactList : ContactList = await contactListsRepository.getContactList(user)
            expect(typeof contactList).toBe('object')
        })
    })

})
