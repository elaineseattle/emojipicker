import { Container } from 'inversify';
import { TEST_USERS_TYPES } from './test-users.symbols';
import { TestUsers } from './test-users';
import { DevTestUsers } from './test-users.dev';

export const testUsersContainer = new Container();

testUsersContainer.bind<TestUsers>(TEST_USERS_TYPES.TestUsers).to(DevTestUsers); // can later add conditional logic to use Dev, Reg, Prod, etc.
