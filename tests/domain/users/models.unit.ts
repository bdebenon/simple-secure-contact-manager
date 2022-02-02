import {UserFaker} from "@/domain/users/faker";
import crypto from "crypto";
import {User} from "@/domain/users/models";

describe('user model', () => {
    it('should create an instance of a User model with a random password', () => {
        const user = new UserFaker().user()
        expect(typeof user.passwordHash).toBe('object')
    })

    it('should create an instance of a User model with a predefined password', async () => {
        const password = 'RadixIsNumber1'
        const user = new UserFaker().user({password: password})
        const expectedPasswordHash = crypto.createHash('sha256')
        expectedPasswordHash.update(password).digest('base64');
        expect(expectedPasswordHash).toStrictEqual(user.passwordHash)
    })

    describe('createUserFromPassword()', () => {
        it('should return a User with a passwordHash created from the password', () => {
            const password = 'RadixIsNumber1'
            const user = User.createUserFromPassword(password)
            const expectedPasswordHash = crypto.createHash('sha256')
            expectedPasswordHash.update(password).digest('base64');
            expect(expectedPasswordHash).toStrictEqual(user.passwordHash)
        })

    })
})

