import {createHash, Hash} from 'crypto'


interface UserParameters {
    passwordHash: Hash;
}

export class User implements UserParameters {
    passwordHash: Hash; // We use the passwordHash as our encryption key

    constructor(params: UserParameters) {
        this.passwordHash = params.passwordHash
    }

    static createUserFromPassword(password: string): User {
        const passwordHash = createHash('sha256')
        passwordHash.update(password).digest('base64');
        return new User(
            {
                passwordHash: passwordHash
            }
        )
    }
}