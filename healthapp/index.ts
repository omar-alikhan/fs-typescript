import express from "express";
import { type Request, type Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import {
  calculateExercises,
  type ExerciseResult,
} from "./exerciseCalculator.ts";

const app = express();
app.use(express.json());

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
    console.error(error);
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyExercises: number[] = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target: number = req.body.target;

    if (!dailyExercises || !target) {
      return res.status(400).json({ error: "missing parameters" });
    }

    const exerciseResult: ExerciseResult = calculateExercises(
      dailyExercises,
      target,
    );

    res.json(exerciseResult);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
