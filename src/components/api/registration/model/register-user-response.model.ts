import dayjs from 'dayjs';

export interface RegisterUserAPIResponse {
  registration_response_code: number;
}

export interface RegisterUserAPIRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  postalCode: string;
  ssn: string;
  email?: string;
  password?: string;
  phone?: string;
  usernameForRegistration?: string;
}
