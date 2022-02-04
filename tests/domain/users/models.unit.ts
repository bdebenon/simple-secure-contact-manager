import {UserFaker} from "@/domain/users/faker";
import {createHmac} from "crypto";
import {User} from "@/domain/users/models";

describe('user model', () => {
    it('should create an instance of a User model with a random password', () => {
        const user = new UserFaker().user()
        expect(typeof user.passwordHash).toBe('string')
    })

    it('should create an instance of a User model with a predefined password', async () => {
        const password = 'RadixIsNumber1'
        const user = new UserFaker().user({password: password})
        const expectedPasswordHash = createHmac('sha256', password).digest('hex');
        expect(expectedPasswordHash).toStrictEqual(user.passwordHash)
    })

    describe('createUserFromPassword()', () => {
        it('should return a User with a passwordHash created from the password', () => {
            const password = 'RadixIsNumber1'
            const user = User.createUserFromPassword(password)
            const expectedPasswordHash = createHmac('sha256', password).digest('hex');
            expect(expectedPasswordHash).toStrictEqual(user.passwordHash)
        })

    })
})

