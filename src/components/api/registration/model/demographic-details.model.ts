import { Dayjs } from 'dayjs';

export interface UserDemographicDetails {
  firstName: string;
  lastName: string;
  birthDate: Dayjs;
  postalCode: string;
  ssn: string;
  resourceId: string;
  activeLoginId: string[];
}
