import { Container } from 'inversify';
import { MyCignaOktaAuth } from './mycigna-member-okta-auth';
import { OktaUtil } from '@cigna/shared/webdriverio-util';
import { OKTA_AUTH_TYPES } from './okta.auth.symbol';

export const oktaAuthContainer = new Container();

oktaAuthContainer.bind<OktaUtil>(OKTA_AUTH_TYPES.OktaUtil).to(MyCignaOktaAuth);
