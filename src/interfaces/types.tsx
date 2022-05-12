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