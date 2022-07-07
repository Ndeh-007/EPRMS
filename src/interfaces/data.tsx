import { peopleCircleSharp, personCircleSharp } from "ionicons/icons";
import { customIcons } from "../images/images";
import { AppPage } from "./types";

const ADL: string[] = [
  "Bathing",
  "Dressing",
  "Grooming",
  "Eating",
  "Transfers",
  "Ambulation",
];

const Appearance: string[] = [
  "Communication",
  "Dental Health",
  "Feet",
  "Hearing",
  "Vision",
  "Skin Condition",
];

const Continence: string[] = ["Urine", "Stool"];

const IADL: string[] = [
  "Preparing Meals",
  "Arranging travels",
  "Climbing Stairs",
  "Housekeeping",
  "Shopping",
  "Walking Outdoors",
  "Managing Finances",
  "Managing Medication",
  "Keeping Doctors Appointments",
];

const ADL_States: string[] = [
  "Independent",
  "Needs Some Assistance",
  "Dependent",
];

const AppearanceStates: string[] = ["Good", "Fair", "Needs Attention",];

const ContinenceStates: string[] = [
  "Continent",
  "Occasionally Incontinent",
  "Incontinent",
];

const Wishes: string[] = [
  "DNR", "No Antibiotics", "No IVs", "Do Not Hospitalize", "Only Comfort Care", "No Feeding Tube"
]

export {
  ADL,
  Appearance,
  Continence,
  IADL,
  ADL_States,
  AppearanceStates,
  ContinenceStates,
  Wishes,
};



export const AdminAppPages: AppPage[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: customIcons.dashboard,
    mdIcon: customIcons.dashboard,
  },
  {
    title: "Patients",
    url: "/patients",
    iosIcon: personCircleSharp,
    mdIcon: personCircleSharp,
  },
  {
    title: "Staff",
    url: "/staff",
    iosIcon: peopleCircleSharp,
    mdIcon: peopleCircleSharp,
  },
];

export const StaffAppPages: AppPage[] = [

  {
    title: "Dashboard",
    url: "/dashboard",
    iosIcon: customIcons.dashboard,
    mdIcon: customIcons.dashboard,
  },
  {
    title: "Patients",
    url: "/patients",
    iosIcon: personCircleSharp,
    mdIcon: personCircleSharp,
  },
]