import {UseCase} from "@/common/use-case";
import {ContactList} from "@/domain/contact-lists/models";
import {Contact} from "@/domain/contacts/models";

interface SearchContactListByStringUseCaseRequestDTO {
    searchString: string;
    contactList: ContactList;
}

export class SearchContactListByStringUseCase implements UseCase<SearchContactListByStringUseCaseRequestDTO, any> {

    execute(request: SearchContactListByStringUseCaseRequestDTO): Array<Contact> {
        const searchString = request.searchString
        const matchingContacts: Contact[] = []

        for (let contact of request.contactList.contacts.values()) {
            if (contact.uuid.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.middleName.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.lastName.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.phoneNumber.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.emailAddress.toLowerCase().includes(searchString.toLowerCase()) ||
                contact.homeAddress.toLowerCase().includes(searchString.toLowerCase())
            ) {
                matchingContacts.push(contact)
            }
        }
        return matchingContacts
    }
}