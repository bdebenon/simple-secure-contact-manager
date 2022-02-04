// @ts-ignore
import faker from 'faker';
import {User} from '@/domain/users/models';

interface UserFakerParameters {
    password?: string;
}

export class UserFaker {
    user(p?: UserFakerParameters): User {
        const defaultPassword = 'Pa$$w0rd'
        const password = p === undefined || p.password === undefined ? defaultPassword : p.password
        return User.createUserFromPassword(password)
    }
}