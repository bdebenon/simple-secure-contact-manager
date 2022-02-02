// @ts-ignore
import faker from 'faker';
import {User} from './models';

import crypto from 'crypto';

interface UserFakerParameters {
    password?: string;
}

export class UserFaker {
    user(p?: UserFakerParameters): User {
        const defaultPassword = 'Pa$$w0rd'
        const password = p === undefined || p.password === undefined ? defaultPassword : p.password
        const passwordHash = crypto.createHash('sha256')
        passwordHash.update(password).digest('base64');

        return new User({
                passwordHash: passwordHash,
            }
        )
    }
}