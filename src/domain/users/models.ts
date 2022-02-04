import {createHmac} from 'crypto'


interface UserParameters {
    passwordHash: string;
}

export class User implements UserParameters {
    passwordHash: string; // We use the passwordHash as our encryption key

    constructor(params: UserParameters) {
        this.passwordHash = params.passwordHash
    }

    static createUserFromPassword(password: string): User {
        const passwordHash = createHmac('sha256', password).digest('hex');
        return new User(
            {
                passwordHash: passwordHash
            }
        )
    }
}