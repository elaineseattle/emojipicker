export interface PlansApiResponse {
  data: Data;
  metadata: Metadata;
}

export interface Data {
  plans: Plan[];
}

export interface Plan {
  id: number;
  title: string;
  vendorLogo: VendorLogo;
  lob: string;
  groupNumber: string;
  categories: Category[];
}

export interface VendorLogo {
  uri: string;
  meta: string;
}

export interface Category {
  title: string;
  link: Link;
  openExternal: boolean;
}

export interface Link {
  uri: string;
  meta: string;
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
