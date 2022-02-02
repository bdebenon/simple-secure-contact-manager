import {ContactList} from "../../domain/contact-lists/models";
import {ContactListRepository} from "../../infra/contact-lists/contact-lists-repository";
import {ContactListFaker} from "../../domain/contact-lists/faker";
import {User} from "../../domain/users/models";
import {decrypt, encrypt} from "../common/encryption"; // This import style requires "esModuleInterop", see "side notes"
import {writeFile, readFile} from "fs"
import {Config} from "../../common/config";
import * as buffer from "buffer";

interface LocalFileContactListRepositoryDTO {
    datafilePath: string;
}

export class LocalFileContactListsRepository implements ContactListRepository {
    datafilePath: string;


    constructor() {
        this.datafilePath = Config.getConfig().datafilePath
    }

    async getContactList(user: User): Promise<ContactList> {
        const datafilePath = this.datafilePath
        const encryptedContactList : Buffer = await new Promise(function (resolve, reject) {
            readFile(datafilePath, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        })
        const encryptedContactListString = encryptedContactList.toString()
        const decryptedContactListString = decrypt(encryptedContactListString, JSON.stringify(user.passwordHash))
        const contactList = ContactList.fromJSONString(decryptedContactListString)

        return contactList
    }

    async storeContactList(user: User, contactList: ContactList): Promise<boolean> {
        const contactListText = JSON.stringify(contactList, function replacer(key, value) {
            return value
        })
        const encryptedContactList = encrypt(contactListText, JSON.stringify(user.passwordHash))
        const datafilePath = this.datafilePath


        return new Promise(function (resolve, reject) {
            writeFile(datafilePath, encryptedContactList, {flag: 'w+'}, (err) => {
                if (err) reject(err);
                else resolve(true);
            })
        })
    }
}