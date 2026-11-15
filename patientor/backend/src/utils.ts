import { type Gender, type NewPatient, genders } from "./types.ts";
// import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isSsn = (ssn: string): boolean => {
  return ssn.includes("-");
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return (genders as readonly string[]).includes(param);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Name is not a string!");
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !isSsn(ssn)) {
    throw new Error("Ssn is not a string or incorrect format!");
  }

  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Date of birth is not a string or a date!");
  }

  return dateOfBirth;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Occupation is not a string!");
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(
      "Gender is not a string or one of: male, female, or other.",
    );
  }

  return gender;
};

const parseNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !(
      "name" in object &&
      "ssn" in object &&
      "dateOfBirth" in object &&
      "occupation" in object &&
      "gender" in object
    )
  )
    throw new Error("Incorrect data: some fields are missing");

  const newPatient: NewPatient = {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
  };

  return newPatient;
};

export default parseNewPatient;
