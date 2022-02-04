import {UserFaker} from "@/domain/users/faker";
import {ContactListFaker} from "@/domain/contact-lists/faker";
import {LocalFileContactListsRepository} from "@/infra/contact-lists/local-file-contact-lists-repository";
import {ContactList} from "@/domain/contact-lists/models";

describe('LocalFileContactListsRepository', () => {
    const password = 'Password1234!'


    describe('storeContactList()', () => {
        it('should create an empty contactList and User and then encrypt the contactList using the User Hash', async () => {
            const user = new UserFaker().user({password: password})
            const contactList = new ContactListFaker().contactList({numberOfContacts: 0})
            const contactListsRepository = new LocalFileContactListsRepository()
            await contactListsRepository.storeContactList(user, contactList)
            const success = await contactListsRepository.canUserDecryptContactList(user)
            expect(success).toBe(true)
        })
    })

    describe('contactListExists()', () => {
        it('should check if the contactList created by storeContactList exists', async () => {
            const contactListsRepository = new LocalFileContactListsRepository()
            const success = await contactListsRepository.contactListExists()
            expect(success).toBe(true)
        })
    })

    describe('canUserDecryptContactList()', () => {
        it('should check if the user can decrypt the contact list created by storeContactList', async () => {
            const user = new UserFaker().user({password: password})
            const contactListsRepository = new LocalFileContactListsRepository()
            const success = await contactListsRepository.canUserDecryptContactList(user)
            expect(success).toBe(true)
        })
    })

    describe('getContactList()', () => {
        it('should create a contactList and User and then encrypt the contactList using the User Hash so we ' +
            'can decrypt it in the next test', async () => {
            const user = new UserFaker().user({password: password})
            const contactList = new ContactListFaker().contactList({numberOfContacts: 20})
            const contactListsRepository = new LocalFileContactListsRepository()
            await contactListsRepository.storeContactList(user, contactList)

            // Test - if we can read this file in the below tests then this is confirmed to work
        })
        it('should fetch the contactList stored by the storeContactList using the User Hash', async () => {
            const user = new UserFaker().user({password: password})
            const contactListsRepository = new LocalFileContactListsRepository()
            const contactList: ContactList = await contactListsRepository.getContactList(user)
            expect(typeof contactList).toBe('object')
        })
    })

})
