import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses.ts";
import patientRouter from "./routes/patients.ts";
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Instructions

// Create a POST endpoint /api/patients for adding patients. Ensure that you can add patients also from the frontend. You can create unique ids of type string using the uuid (opens in a new tab) library:
