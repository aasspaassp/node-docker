import { Doctor } from "../mongodb/controllers/Doctor.js";
import { Decimal128 } from "mongodb";

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  export function autoGenerateDoctor() {
    const name = generateRandomString(7)
    const address = generateRandomString(14)
    const specialty = "general"
    const email = `${generateRandomString(5)}@doctorsapp.com`
    const password = "dalepapimasduro"
    const price = new Decimal128("800.00")
    const birthYear = 1980
    const doctor = new Doctor(address,specialty,name,birthYear,email,password, price)
    return doctor
  }
  