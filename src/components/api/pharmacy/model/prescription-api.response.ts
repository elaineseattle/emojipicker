export interface PrescriptionApiResponse {
  totalCount: number;
  cartCount: number;
  hasArchivedRx: boolean;

  prescriptions: Prescription[];
  annualSavingsCost: number;
  hdCacheFlag: boolean;
  rtmCacheFlag: number;
  retailCacheFlag: number;
  cacheReferenceId: string;

  refillCount: number;

  opportunityCount: number;
}

export interface Prescription {
  onlineOrderNotAvailable: boolean;
  autoRefillEligibleIndicator: boolean;
  autoRefillEnrollmentIndicator: boolean;
  clickToActionSortIndex: number;
  isNewRx: boolean;
  resourceId: string;
  rxNumber: string;
  drugName: string;
  drugNDC: string;
  drugDose: string;
  drugForm: string;
  drugDisplayName: string;
  quantity: number;
  metricQuantity: number;
  daysSupply: number;
  patientFirstName: string;
  patientLastName: string;
  patientDisplayName: string;
  patientDOB: string;
  lastFillDate: string;
  rxState: string;
  nextRefillDate: string;
  orderDate: string;
  pharmacyName: string;
  receivedDate: string;
  refillsRemaining: number;
  opportunityFlag: boolean;
  pharmacyCategory: string;
  dispenseAsWrittenCode: string;
  prescriptionStatus: string;
  dashboardRxStatus: string;
  prescriber: Prescriber;
  rxInCart: boolean;
  rxArchived: boolean;
  consentRequired: boolean;
  estimatedSavingsCostSort: number;
  sortFillDate: string;
}

export interface Prescriber {
  displayName: string;
  addressLine: string[];
  city: string;
  stateCode: string;
  postalCode: string;
  phoneNumber: string;
}
