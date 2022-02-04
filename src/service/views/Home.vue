<template>
  <v-container>
    <!--  Enter Password Card  -->
    <v-card
        class="mx-auto"
        max-width="800"
        outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            RDX Works
          </div>
          <v-list-item-title class="text-h5 mb-1">
            Welcome to Simple Secure Contact Manager
          </v-list-item-title>
          <v-list-item-subtitle>Please enter the password for your contact data file.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Enter password here"
            @click:append="showPassword = !showPassword"
            @keydown.enter.prevent="validatePassword"
        ></v-text-field>
        <div class="red--text">{{ errorMessage }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
            outlined
            text
            @click="openPasswordResetDialogue"
        >
          Reset Password/Account
        </v-btn>
        <v-btn
            outlined
            text
            @click="validatePassword"
        >
          Submit Password
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--  Reset Account Dialog  -->
    <v-dialog
        v-model="resetAccountDialog"
        width="500"
    >
      <v-card v-if="!passwordWasJustReset">
        <v-card-title class="text-h5 grey lighten-2">
          Reset Password/Account
        </v-card-title>

        <v-card-text>
          Warning: This will delete all data stored locally related to the Simple Secure Contact Manager.

          In order to reset, please enter a new password

          <v-text-field
              v-model="newPassword"
              :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showNewPassword ? 'text' : 'password'"
              name="input-10-1"
              label="Enter new password here"
              @click:append="showNewPassword = !showNewPassword"
          ></v-text-field>

        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="resetAccountDialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="resetPassword"
              :disabled="newPassword === ''"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-title class="text-h5 grey lighten-2">
          Reset Password/Account
        </v-card-title>

        <v-card-text>
          Your password & account have been successfully reset.
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              text
              @click="resetAccountDialog = false"
          >
            Proceed back to login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {User} from "@/domain/users/models";
import {ContactList} from "@/domain/contact-lists/models";

const {ipcRenderer} = require('electron')


export default Vue.extend({
  name: 'Home',

  data() {
    return {
      password: '',
      newPassword: '',
      showPassword: false,
      showNewPassword: false,
      errorMessage: '',
      resetAccountDialog: false,
      passwordWasJustReset: false
    }
  },
  methods: {
    validatePassword() {

      const user = User.createUserFromPassword(this.password)

      ipcRenderer.once('can-user-decrypt-contact-list-reply', (event, canUserDecryptContactList) => {
        if (canUserDecryptContactList) {
          // Store user
          this.$store.dispatch('login', {
            user: user
          })

          // Navigate to Contacts page
          this.$router.push({name: 'Contacts'}).catch((e) => {
            console.log(e)
          });
        } else {
          this.errorMessage = 'Invalid Password Detected.'
        }
      })
      ipcRenderer.send('can-user-decrypt-contact-list-message', user)
    },
    openPasswordResetDialogue() {
      this.newPassword = ''
      this.passwordWasJustReset = false
      this.resetAccountDialog = true
    },
    resetPassword() {
      const user = User.createUserFromPassword(this.newPassword)
      const blankContactList = ContactList.emptyContactList()

      ipcRenderer.once('store-contact-list-reply', (event, success) => {
        console.log('Stored ContactList successfully: ', success)
      })
      ipcRenderer.send('store-contact-list-message', user, blankContactList)
      this.passwordWasJustReset = true
    }
  }
})
</script>
