import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import patientsService from "../services/patientsService.ts";
import {
  type NewPatient,
  NewPatientSchema,
  type NonSensitivePatient,
} from "../types.ts";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res
      .status(400)
      .send(error.issues.map(issue => issue.message).join(" and "));
  } else {
    next(error);
  }
};

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientsService.getNonSensitivePatients();
  res.send(data);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<NewPatient>) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
