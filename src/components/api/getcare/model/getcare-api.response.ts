export interface GetCareApiResponse {
  data: Data;
  metadata: Metadata;
}

export interface Data {
  careOptions: CareOptions[];
  guidance: Guidance[];
  emergency: Emergency[];
}

export interface CareOptions {
  title: string;
  subText: string;
  icon: string;
  path: string;
  identifier: string;
  openExternal: boolean;
}

export interface Guidance {
  title: string;
  subText: string;
  icon: string;
  identifier: string;
}

export interface Emergency {
  title: string;
  subText: string;
  icon: string;
  identifier: string;
}

export interface Metadata {
  serviceReferenceId: string;
  outcome: Outcome;
}
export interface Outcome {
  status: number;
  type: string;
  message: string;
  code: number;
  additionalDetails: [];
}
