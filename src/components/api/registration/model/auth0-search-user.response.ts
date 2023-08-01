export interface Auth0SearchUserResponse {
  created_at: string;
  email: string;
  email_verified: string;
  family_name: string;
  given_name: string;

  identities: UserIdentities[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;

  statusCode: number;
}

export interface UserIdentities {
  user_id: string;
  connection: 'Username-Password-Authentication';
  provider: string;
  isSocial: boolean;
}
