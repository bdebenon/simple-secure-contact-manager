import {ContactList} from "@/domain/contact-lists/models";
import {ContactListRepository} from "@/infra/contact-lists/contact-lists-repository";
import {User} from "@/domain/users/models";
import {decrypt, encrypt} from "@/infra/common/encryption";
import fs from "fs"
import {Config} from "@/common/config";
import {jsonReplacer} from "@/common/utils";


export class LocalFileContactListsRepository implements ContactListRepository {
    datafilePath: string;


    constructor() {
        this.datafilePath = Config.getConfig().datafilePath
    }

    async contactListExists(): Promise<boolean> {
        return fs.existsSync(this.datafilePath)
    }

    async canUserDecryptContactList(user: User): Promise<boolean> {
        return this.getContactList(user).then(
            () => true
        ).catch(
            (e) => {
                console.log('unable to decrypt contact list')
                return false
            }
        )
    }

    async getContactList(user: User): Promise<ContactList> {
        const datafilePath = this.datafilePath
        const encryptedContactList: Buffer = fs.readFileSync(datafilePath)
        const encryptedContactListString = encryptedContactList.toString()
        const decryptedContactListString = decrypt(encryptedContactListString, user.passwordHash)
        const contactList = ContactList.fromJSONString(decryptedContactListString)
        return contactList
    }

    async storeContactList(user: User, contactList: ContactList) {
        const contactListText = JSON.stringify(contactList, jsonReplacer);
        const encryptedContactList = encrypt(contactListText, user.passwordHash)
        const datafilePath = this.datafilePath
        return fs.writeFileSync(datafilePath, encryptedContactList, {flag: 'w+'})
    }
}