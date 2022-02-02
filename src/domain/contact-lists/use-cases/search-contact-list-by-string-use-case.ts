import {UseCase} from "../../../common/use-case";
import {ContactList} from "../models";
import {Contact} from "../../contacts/models";

interface SearchContactListByStringUseCaseRequestDTO {
    searchString: string;
    contactList: ContactList;
}

export class SearchContactListByStringUseCase implements UseCase<SearchContactListByStringUseCaseRequestDTO, any> {

    execute(request: SearchContactListByStringUseCaseRequestDTO): Array<Contact> {
        const searchString = request.searchString
        const matchingContacts: Contact[] = []

        for (let contact of request.contactList.contacts.values()) {
            if (contact.uuid.includes(searchString) ||
                contact.firstName.includes(searchString) ||
                contact.middleName.includes(searchString) ||
                contact.lastName.includes(searchString) ||
                contact.phoneNumber.includes(searchString) ||
                contact.emailAddress.includes(searchString) ||
                contact.homeAddress.includes(searchString)
            ) {
                matchingContacts.push(contact)
            }
        }
        return matchingContacts
    }
}