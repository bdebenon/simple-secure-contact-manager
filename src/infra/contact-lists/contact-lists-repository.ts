import {ContactList} from "../../domain/contact-lists/models";
import {User} from "../../domain/users/models";

export interface ContactListRepository {
    getContactList(user: User): Promise<ContactList> | ContactList

    storeContactList(user: User, contactList: ContactList): Promise<boolean> | boolean

}