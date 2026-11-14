import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import { type Patient } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<Patient[]>) => {
  const data = patientsService.getPatients();
  res.send(data);
});

export default router;
