import { Storage } from "@capacitor/storage";
import { Staff } from "../interfaces/types";

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
