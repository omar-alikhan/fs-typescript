import { z } from "zod";

export const genders = ["male", "female", "other"] as const;

export type Gender = (typeof genders)[number];

export interface Patient extends NewPatient {
  id: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  ssn: z.string().includes("-"),
  dateOfBirth: z.iso.date(),
  occupation: z.string(),
  gender: z.enum(genders),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
