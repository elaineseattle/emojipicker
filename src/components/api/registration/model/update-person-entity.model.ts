export interface UpdatePersonRecordHubResponseData {
  resourceId: string;
  keyRing: KeyRing[];
}

export interface KeyRing {
  status: Status;
  profileId: string;
  idType: string;
}

export interface Status {
  value: string;
}
