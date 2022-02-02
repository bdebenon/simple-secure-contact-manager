# Radix Coding Challenge

## Conventions

- filenames: kebab-case
- folder names: kebab-case
- test cases:
  - <filename>.unit.ts
  - <filename>.integration.ts

## Application Overview

### Capabilities

This application has the following capabilities:

- access to application data controlled by password
- decrypt and load contact file from disk, or create new file if none existing
- be able to detect if the correct password was used without displaying corrupted or garbage data
- add new contacts
- edit existing contacts
- search contacts by any field
- write encrypted modified contacts datafile to disk

### User Interface

The user interface for this project is powered by Electron

https://www.electronjs.org/

## Running the app

#### Note about the project
The following commands were run to generate the stub code for ElectronJS/Vue/Vuetify
```bash
npm install -g @vue/cli
vue create simple-secure-contact-manager
vue add vuetify
vue add electron-builder
```
These do not need to be run again - just here for reference

### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn electron:serve
```

#### Compiles and minifies for production

```
yarn electron:build
```

# TODO

Could someone use the

- Common
    - [x] config
- Domain
    - [x] contact
        - first name
        - last name
        - middle name
        - phone number
        - email address
        - address
    - [x] contact list
        - [x] models
        - [x] searchForContactUseCase
        - [x] add contact
        - [x] replace contact
        - [x] delete contact
    - [x] user
        - passwordHash
        - [x] createUserFromPassword

- Infra
    - [x] common
        - [x] encryptFile
        - [x] decryptFile
    - [x] contact list
        - [x] get contact list
        - [x] store contact list
- Service (Do we need any of this shit below besides the electron stuff?)
    - [] views
        - TODO: Add electron views

- Misc
    - [x] Fix imports
    - [] Write build instructions
    - [] Cleanup readme
    - [x] Cleanup dependencies 