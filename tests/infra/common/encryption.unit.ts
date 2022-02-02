import {decrypt, encrypt} from "@/infra/common/encryption";

describe('common', () => {

    describe('encrypt() and decrypt()', () => {
        it('should encrypt text and then decrypt it using the same encryption key', () => {
            const encryptionKey = 'This is my encryption key'
            const text = '{"contact_list": [{"first_name": "john", "last_name":"wick"]}'
            const encryptedText = encrypt(text, encryptionKey)
            const decryptedText = decrypt(encryptedText, encryptionKey)
            expect(text).toBe(decryptedText)
        })
    })

})
