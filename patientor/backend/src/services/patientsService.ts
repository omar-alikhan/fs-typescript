import patients from "../data/patients.ts";
import type { Patient } from "../types.ts";

const getPatients = (): Patient[] => {
  return patients;
};

export default { getPatients };
