import express from "express";
import { type Request, type Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";

const app = express();

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  try {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    res.json({
      weight,
      height,
      bmi: calculateBmi(weight, height),
    });
  } catch (error) {
    res.status(404).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
