<template>
  <v-container>

    <!--  Logout Row  -->
    <v-row>
      <v-card
          class="mx-auto px-auto text-right"
          min-width="800"
          outlined
      >
        <v-btn
            class="ma-2"
            color="primary"
            @click="logout"
        >
          Logout
        </v-btn>
      </v-card>
    </v-row>

    <v-row>
      <!--   Contact and Search Card   -->
      <v-card
          class="mr-0 pr-0 ml-auto pl-auto text-left"
          width="300"
          outlined
      >
        <v-card-text>
          <!--     Search     -->
          <v-text-field
              v-model="searchString"
              label="Search for contact"
              @keydown.enter.prevent="searchForContact"
          >
          </v-text-field>
          <v-row>
            <v-btn
                class="mb-4 ml-2 mr-auto"
                color="primary"
                text
                @click="searchForContact"
            >
              Search
            </v-btn>
            <v-btn
                class="mb-4 mr-2 ml-auto"
                color="primary"
                text
                @click="clearSearchResults"
            >
              Clear
            </v-btn>
          </v-row>
          <v-divider/>

          <!--     Contact List     -->
          <v-virtual-scroll
              :items="searchResults || Array.from(contactList.contacts.values())"
              :item-height="50"
              height="300"
              v-if="contactList"
              color="primary"
          >
            <template v-slot:default="{ item }">
              <v-list-item
                  :key="item.uuid"
                  @click="selectContact(item)"
              >
                <v-list-item-content>
                  <v-list-item-title
                      v-text="item.firstName + ' ' + item.lastName"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-card-text>
      </v-card>

      <!--   Contact Information Card   -->
      <v-card
          class="ml-0 pl-0 mr-auto pr-auto"
          width="500"
          outlined
      >
        <v-card-title v-if="selectedContact">
          {{ selectedContact.firstName }} {{ selectedContact.lastName }}
        </v-card-title>
        <v-card-text v-if="selectedContact">
          <p><span class="font-weight-bold">First Name:</span> {{ selectedContact.firstName }}</p>
          <p><span class="font-weight-bold">Middle Name:</span> {{ selectedContact.middleName }}</p>
          <p><span class="font-weight-bold">Last Name:</span> {{ selectedContact.lastName }}</p>
          <p><span class="font-weight-bold">Phone:</span> {{ selectedContact.phoneNumber }}</p>
          <p><span class="font-weight-bold">Email:</span> {{ selectedContact.emailAddress }}</p>
          <p><span class="font-weight-bold">Home Address:</span> {{ selectedContact.homeAddress }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              class="ml-2 mr-auto"
              @click="openAddNewContactDialog"
          >
            Add New Contact
          </v-btn>
          <v-btn
              v-if="selectedContact"
              color="primary"
              class="mr-2 ml-auto"
              @click="openUpdateContactDialog"
          >
            Edit Contact
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>

    <!--  Add New Contact Dialog -->
    <v-dialog
        v-model="showContactDialog"
        persistent
        max-width="600px"
    >
      <v-card>
        <v-card-title
            class="text--primary"
        >
          <span class="text-h5 text--primary">{{ contactDialogTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="firstName"
                    label="First Name*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="middleName"
                    label="Middle Name*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
                  md="4"
              >
                <v-text-field
                    v-model="lastName"
                    label="Last Name*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="emailAddress"
                    label="Email Address*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="homeAddress"
                    label="Home Address*"
                    required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="showContactDialog = false"
          >
            Close
          </v-btn>
          <v-btn v-if="contactDialogTitle === 'Add New Contact'"
                 color="blue darken-1"
                 text
                 @click="addNewContact"
          >
            Add
          </v-btn>
          <v-btn v-if="contactDialogTitle === 'Update Existing Contact'"
                 color="blue darken-1"
                 text
                 @click="updateExistingContact"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {ContactList} from "@/domain/contact-lists/models";
import {Contact} from "@/domain/contacts/models";
import {
  SearchContactListByStringUseCase
} from "@/domain/contact-lists/use-cases/search-contact-list-by-string-use-case";
import {v4 as uuidv4} from "uuid";
import {mapGetters} from 'vuex';

const {ipcRenderer} = require('electron')

const searchContactListByStringUseCase: SearchContactListByStringUseCase = new SearchContactListByStringUseCase()

export default Vue.extend({
  name: 'Contacts',
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      selectedContact: undefined as Contact | undefined,
      contactList: undefined as ContactList | undefined,
      searchResults: undefined as Array<Contact> | undefined,
      searchString: '',
      showContactDialog: false,
      contactDialogTitle: '',
      firstName: '' as string,
      middleName: '' as string,
      lastName: '' as string,
      phoneNumber: '' as string,
      emailAddress: '' as string,
      homeAddress: '' as string,
    }
  },
  mounted() {
    this.getContactList()
  },
  methods: {
    selectContact(contact: Contact) {
      this.selectedContact = contact
    },
    getContactList() {
      ipcRenderer.once('get-contact-list-reply', (event, contactList) => {
        this.contactList = contactList
      })
      ipcRenderer.send('get-contact-list-message', this.user)
    },
    searchForContact() {
      if (this.contactList) {
        this.searchResults = searchContactListByStringUseCase.execute({
          searchString: this.searchString,
          contactList: this.contactList
        })
      }
    },
    clearSearchResults() {
      this.searchResults = undefined
      this.searchString = ''
    },
    openAddNewContactDialog() {
      this.contactDialogTitle = 'Add New Contact'
      this.firstName = ''
      this.middleName = ''
      this.lastName = ''
      this.phoneNumber = ''
      this.emailAddress = ''
      this.homeAddress = ''
      this.showContactDialog = true
    },
    addNewContact() {
      if (this.contactList) {
        const uuid = uuidv4()
        const contact = new Contact({
          uuid: uuid,
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
          emailAddress: this.emailAddress,
          homeAddress: this.homeAddress,
        })
        // TODO: Fix for the future - This should be using .addContact instead of contacts.set
        this.contactList.contacts.set(uuid, contact)

        // Store contactList
        ipcRenderer.once('store-contact-list-reply', (event, success) => {
          console.log('Stored ContactList successfully: ', success)
        })
        ipcRenderer.send('store-contact-list-message', this.user, this.contactList)
      }
      this.showContactDialog = false
    },
    openUpdateContactDialog() {
      this.contactDialogTitle = 'Update Existing Contact'
      if (this.selectedContact) {
        this.firstName = this.selectedContact.firstName
        this.middleName = this.selectedContact.middleName
        this.lastName = this.selectedContact.lastName
        this.phoneNumber = this.selectedContact.phoneNumber
        this.emailAddress = this.selectedContact.emailAddress
        this.homeAddress = this.selectedContact.homeAddress
        this.showContactDialog = true
      }
    },
    updateExistingContact() {
      if (this.selectedContact && this.contactList) {
        const uuid = this.selectedContact?.uuid
        // TODO: Fix for the future - This should be using .getContact instead of contacts.get
        const contact = this.contactList.contacts.get(uuid)
        if (contact) {
          contact.firstName = this.firstName
          contact.middleName = this.middleName
          contact.lastName = this.lastName
          contact.phoneNumber = this.phoneNumber
          contact.emailAddress = this.emailAddress
          contact.homeAddress = this.homeAddress
        }

        // Store contactList
        ipcRenderer.once('store-contact-list-reply', (event, success) => {
          console.log('Stored ContactList successfully: ', success)
        })
        ipcRenderer.send('store-contact-list-message', this.user, this.contactList)
      }
      this.showContactDialog = false
    },
    logout() {
      // Reset user in store
      this.$store.dispatch('logout')

      // Navigate to Home page
      this.$router.push({name: 'Home'}).catch((e) => {
        console.log(e)
      });
    }
  }
})
</script>

