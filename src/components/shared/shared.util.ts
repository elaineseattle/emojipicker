import { CIGNA_EMAIL_DOMAIN, MFA_EMAIL_DOMAIN } from './constants';

export const getEmailDomain = (isMFA: boolean) =>
  isMFA ? MFA_EMAIL_DOMAIN : CIGNA_EMAIL_DOMAIN;

export const getEmailToRegisterFromPersonResourceID = (
  personResourceId: string,
  isMFA = false,
) => `${personResourceId.slice(0, 6)}@${getEmailDomain(isMFA)}`;
