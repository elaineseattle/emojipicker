import { Container } from 'inversify';
import { SHARED_API_TYPES } from './shared.symbols';
import { PersonRecordHubGateway } from './person-record-hub.gateway';
import { MobileGateway } from '@cigna/shared/webdriverio-util';
import { Auth0Gateway } from './auth-0-gateway';
import { Auth0Util } from '../registration/interfaces';
import { Auth0UtilImpl } from '../registration/domain/auth0-util';
import { DigitalGateway } from './digital-gateway';

export const sharedAPIContainer = new Container();

sharedAPIContainer
  .bind<MobileGateway>(SHARED_API_TYPES.PersonRecordHubGateway)
  .to(PersonRecordHubGateway);

sharedAPIContainer
  .bind<MobileGateway>(SHARED_API_TYPES.Auth0Gateway)
  .to(Auth0Gateway);

sharedAPIContainer
  .bind<Auth0Util>(SHARED_API_TYPES.Auth0Util)
  .to(Auth0UtilImpl);

sharedAPIContainer
  .bind<MobileGateway>(SHARED_API_TYPES.DigitalGateway)
  .to(DigitalGateway);
