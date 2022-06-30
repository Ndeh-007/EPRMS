import { Storage } from "@capacitor/storage";
import { Staff } from "../interfaces/types";
import { firestore } from "../Firebase";

/**
 * It takes a string, makes it lowercase, then capitalizes the first letter and returns the result
 * @param {string} value - string - This is the value that will be passed into the function.
 * @returns The first letter of the string is being capitalized and the rest of the string is being
 * returned in lowercase.
 */
export function capitalizeString(value: string) {
  const lower = value.toLowerCase();
  return value.charAt(0).toUpperCase() + lower.slice(1);
}

export function generatePassword() {
  return "";
}

export async function StoreUserData(Data: Staff) {
  await Storage.set({
    key: "staff",
    value: JSON.stringify(Data),
  });
  return true;
}

export async function GetUserData() {
  const { value } = await Storage.get({ key: "staff" });
  if (value) return JSON.parse(value);
  else return null;
}

export async function DeleteUserData() {
  await Storage.remove({ key: "staff" });
  return true;
}

export function calculateAge(dateString: string | number | undefined) {
  if (dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return "";
}

export function convertDate(date: string | undefined | number, time?: boolean) {
  if (date && date != "") {
    let _date = new Date(date).toLocaleDateString();
    return " " + _date;
  }
  if (date && date != "" && time) {
    let _date = new Date(date).toLocaleDateString();
    let _time = new Date(date).toLocaleTimeString();
    return " " + _date + " " + _time;
  }
  return "";
}

export function refactor() {
  firestore
    .collection("patients")
    .get()
    .then((docs) => {
      let ids = docs.docs.map((doc) => doc.id);
      ids.forEach((id) => {
        firestore.collection("patients").doc(id).delete();
      });
    })
    .then(() => {
      alert("process complete");
    })
    .catch((e) => {
      console.log(e);
    });
}
