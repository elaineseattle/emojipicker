export interface SearchPersonsResponse {
  resourceId: string;
  links: Link[];
  name: Name;
  birthDate: string;
  properties: Property[];
  storeKeySet: StoreKeySet;
  metadata: Metadata;
  postalAddresses?: PostalAddress[];
  ssn: string;
  keyRing?: KeyRing[];
}

export interface KeyRing {
  status: KeyStatus;
  profileId: string;
  idType: string;
}

export interface KeyStatus {
  value: string;
}

export interface Link {
  rel: string;
  href: string;
}

export interface VerificationStatus {
  status: string;
  lastVerifiedDate: Date;
  note: string;
}

export interface Name {
  first: string;
  last: string;
  standardizedFirst: string;
  providedLast: string;
  properties: Property[];
  verificationStatus: VerificationStatus;
}

export interface Property {
  name: string;
  value: string;
}

export interface KeyComponent {
  name: string;
  value: string;
}

export interface PrimaryKey {
  storeName: string;
  keyName: string;
  keyComponents: KeyComponent[];
}

export interface Status {
  effectiveDateTime: Date;
  expirationDateTime: Date;
}

export interface SecondaryKey {
  storeName: string;
  keyName: string;
  keyComponents: KeyComponent[];
  status: Status;
  properties: Property[];
}

export interface StoreKeySet {
  primaryKey: PrimaryKey;
  secondaryKeys: SecondaryKey[];
}

export interface CreateMetadata {
  requestId: string;
  requestDateTime: Date;
  requestTimestamp: string;
  originatingConsumer: string;
  mongoTimestamp: number;
}

export interface UpdateMetadata {
  requestId: string;
  requestDateTime: Date;
  requestTimestamp: string;
  originatingConsumer: string;
  mongoTimestamp: number;
}

export interface Metadata {
  entityId: string;
  entityName: string;
  createMetadata: CreateMetadata;
  updateMetadata: UpdateMetadata;
}

export interface State {
  code: string;
}

export interface SourcedFrom {
  sourceType: string;
}

export interface PostalAddress {
  relativeId: string;
  links: Link[];
  storeKeySet: StoreKeySet;
  streetAddress: string[];
  postalCode: string;
  city: string;
  state: State;
  uspsAddressType: string;
  sourcedFrom: SourcedFrom;
  metadata: Metadata;
  verificationStatus: VerificationStatus;
  addressType: AddressType;
}

export enum AddressType {
  HOME = 'HOME',
  SHIPPING = 'SHIPPING',
}

export interface UpdateKeyRingRequest {
  resourceId: string;
  profileId: string;
  status: string;
}

export enum KeyRingUserStatus {
  InActive = 'InActive',
}

export interface UpdateKeyRingRequestToPass {
  keyRing: KeyRing[];
}
