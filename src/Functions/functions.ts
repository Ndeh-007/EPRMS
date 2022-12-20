import { Storage } from "@capacitor/storage";
import { Staff } from "../interfaces/types";
import { firestore } from "../Firebase";
import emailjs from "@emailjs/browser";

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

export async function StoreAppColor(color: string) {
  await Storage.set({
    key: "appColor",
    value: color,
  });
  return true;
}

export async function GetAppColor() {
  const color = await Storage.get({ key: "appColor" });
  return color.value;
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
  firestore.collection('admittedPatients').get().then(docs=>{
    docs.forEach(doc=>{
      let data = doc.data();
      data.id =  doc.id+Date.now()
      firestore.collection('activity').doc(data.id).set(data);
    })
  })
}

export async function sendEmail(data: any, update: boolean = false) {
  if (update === false) {
    let message = `<strong>Username: </strong> ${data.username}<br> <strong>Password: </strong> ${data.password}`;
    console.log(message);
    // collect data
    const templateParams = {
      name: data.name,
      email: data.email,
      message: message,
      subject: "Access Credentials to AMR",
    };

    // send mail
    return emailjs
      .send(
        "awakedom",
        "awakedom_template",
        templateParams,
        "user_c53fw8KxQvmVLFDZHvn0U"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  } else {
    let message = `<strong>Username: </strong> ${data.username}<br> <strong>Password: </strong> ${data.password}`;
    console.log(message);
    // collect data
    const templateParams = {
      name: data.name,
      email: data.email,
      message: message,
      subject: "New Access Credentials to AMR",
    };

    // send mail
    return emailjs
      .send(
        "awakedom",
        "awakedom_template",
        templateParams,
        "user_c53fw8KxQvmVLFDZHvn0U"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }
}

export function canEdit(data: Staff | undefined, area: string) {
  let role = data?.role?.toLocaleLowerCase();
  let position = data?.position?.toLocaleLowerCase();
  if (role === "admin") {
    return false;
  }

  // when area is specified as
  else if (
    role === "staff" &&
    (position === "dr" || position === "ns") &&
    (area === "complaint" ||
      area === "appearance" ||
      area === "history" ||
      area === "physicalExam" ||
      area === "continence" ||
      area === "iadl" ||
      area === "adl" ||
      area === "management" ||
      area === "appearance" ||
      area === "appearance")
  ) {
    return false;
  } else if (role === "staff" && position === "dr" && area === "diagnosis") {
    return false;
  } else if (role === "staff" && position === "ns" && area === "finance") {
    return false;
  } else if (role === "staff" && position === "lsc" && area === "lab") {
    return false;
  } else {
    return true;
  }
}

export function canPerformAction(data: Staff | undefined, action: string) {
  let role = data?.role?.toLocaleLowerCase();
  let position = data?.position?.toLocaleLowerCase();

  if (role === "admin") {
    return true;
  }

  // when action is specified as
  else if (
    role === "staff" &&
    (position === "dr" || position === "ns" || position === "lsc") &&
    (action === "createStaff" ||
      action === "deleteStaff" ||
      action === "deletePatient" ||
      action === "editStaff")
  ) {
    return false;
  } else if (
    role === "staff" &&
    (position === "dr" || position === "ns") &&
    (action === "createPatient" ||
      action === "dischargePatient" ||
      action === "admitPatient" ||
      action === "editPatient")
  ) {
    return true;
  } else if (
    role === "staff" &&
    (position === "dr" || position === "ns" || position === "lsc") &&
    action === "viewRecords"
  ) {
    return true;
  } else {
    return false;
  }
}
