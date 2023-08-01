export interface NavigationApiResponse {
  data: Data;
  metadata: Metadata;
}
export interface Data {
  navMenu: NavMenu[];
  isNewFormat: boolean;
}
export interface NavMenu {
  title: string;
  icon: string;
  path: string;
  identifier: string;
  openExternal: boolean;
  hubKey: string;
  tiles: string[];
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
