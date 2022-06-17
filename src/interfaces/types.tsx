export interface MPI {
    name:string,
    dateOfBirth: string | Date,
    sex: string,
    tel: number | string,
    address: string | number,
}

export interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
  }

export interface Staff{
    image:any
    id: any;
    name: string | null | undefined;
    role:string | null | undefined;
    email:string | null | undefined;
    tel:string | null | undefined;
    biography:string | null | undefined;
    sex: string | null | undefined;
    maritalStatus:string | null | undefined;
    dateOfBirth:string | null | undefined;
    address:string | null | undefined;
    password: string | null | undefined;
    username:string | null | undefined;
    position?:any
}

export interface StaffAccess{
    password: string | null | undefined;
    username:string | null | undefined;
    role:string | null | undefined;
    position:string | null | undefined;
}