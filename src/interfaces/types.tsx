export interface MPI {
  name: string;
  dateOfBirth: string | Date;
  sex: string;
  tel: number | string;
  address: string | number;
}

export interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export interface Staff {
  image: any;
  id: any;
  name: any
  role: string | null | undefined;
  email: string | null | undefined;
  tel: string | null | undefined;
  biography: string | null | undefined;
  sex: string | null | undefined;
  maritalStatus: string | null | undefined;
  dateOfBirth: string | null | undefined;
  address: string | null | undefined;
  password: string | null | undefined;
  username: string | null | undefined;
  position?: any;
  date: number | string;
  displayName?: string | null;
  // email: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string;
  /**
   * The user's unique ID.
   */
  uid?: string;
  lastSeen?: string;
}

export interface StaffAccess {
  password: string | null | undefined;
  username: string | null | undefined;
  role: string | null | undefined;
  position: string | null | undefined;
}

export interface Patient {
  name: string;
  occupation: string;
  dateOfBirth: string;
  tribe: string;
  email: string;
  tel: string;
  address: string;
  sex: string;
  maritalStatus: string;
  bloodGroup: string;
  id: string;
  image: string;
  condition: string;
  powerOfAttorney: string;
  healthCareProxy: string;
  wishes: string[];
  insurance: string;
  momoNumber: string;
  cardNumber: string;
  expirationDate: string;
  date: string | number;
  religion: string;
  emergencyContact: string; 
  ward?: string;
  mothersName?:string;
  handlers?: string[];
  complaint?:string;
  status?:string;
  visitedDate?:string;
  dischargedDate?:string;
  admissionDate?:string;
  dischargeStatus?:string;
  payment?:Payment
}

export interface Payment{

  mode:string;
  amount:number | string;
  date:string;
  details:string;
  status:string;
  momoNumber?:string;
  cardNumber?:string;
  cvc?:string;
  expirationDate?:string,
  insuranceID?:string,
}

export interface PatientRecordInterface {
  id: string;
  date: string | number;
  vitals: VitalSigns;
  patientComplaint: string;
  diagnosis: string;
  treatment: string; 
  patient?: Patient;
  admission?: Admission;
  status?: string;
  dischargeDate?: string;
  dischargeStatus?: string;
  admitted?:boolean;
  discharged?:boolean;
  ward?: string; 
  physicalExam?:string;
  payment?:Payment
}

export interface HistoryInterface {
  title: string;
  attributes: HistoryAttribute[];
  id:string;
}

export interface Admission {
  date: string | number;
  reason: string;
  description: string;
  id:string
}

export interface Overview {
  title: string;
  attribute: {
    value: string;
    description: string;
  }[];
}

export interface OverviewAttribute {
  value: string;
  description: string;
}

export interface HistoryAttribute {
  title: string;
  date: string | number;
  description: string;
  id:string;
}


export interface Immunity {
  date: string | number;
  name: string;
}

export interface VitalSigns {
  pulse: string;
  weight: string;
  bloodPressure: string;
  temperature: string;
}

export interface ManagementInterface {
  problem: string;
  solution: string;
  date: string;
}

export interface Labs {
  test: string;
  result: string;
  handler: string;
  date: string | number;
}
