import { Container } from 'inversify';
import { AUTH_TYPES } from './auth.symbol';
import { HealthKitAuth0 } from './auth0/health-kit.auth';
import { Auth0Util } from '@cigna/shared/webdriverio-util';

export const authContainer = new Container();

authContainer.bind<Auth0Util>(AUTH_TYPES.HealthKitAuth0).to(HealthKitAuth0);
