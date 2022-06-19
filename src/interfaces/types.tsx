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
  name: string | null | undefined;
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
  ward?: string; 
}

export interface HistoryInterface {
  title: string;
  attribute: HistoryAttribute;
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

export interface HistoryAttribute {
  title: string;
  date: string | number;
  description: string;
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

export interface Managment {
  problem: string;
  solution: string;
  date: string | number;
}

export interface Labs {
  test: string;
  result: string;
  handler: string;
  date: string | number;
}
