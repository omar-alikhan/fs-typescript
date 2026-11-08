type Rating = 1 | 2 | 3;
type RatingDescription =
  | "you got this, keep trying harder!"
  | "not too bad but could be better"
  | "wow you're doing great, keep it up!";

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface ExerciseHourValues {
  exerciseHours: any;
  target: number;
}

const parseExerciseHourArguments = (args: string[]): ExerciseHourValues => {
  const [, , targetArg, ...exerciseHoursArgs] = args;
  const exerciseHours = exerciseHoursArgs.map(Number);
  const target = Number(targetArg);

  if (args.length < 4) throw new Error("Not enough arguments");

  if (!isNaN(target) && !exerciseHours.some(hour => isNaN(hour))) {
    return {
      exerciseHours,
      target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): ExerciseResult => {
  const periodLength: number = exerciseHours.length;
  const totalHours: number = exerciseHours.reduce(
    (sum, hours) => sum + hours,
    0,
  );
  const average: number = totalHours / periodLength;
  const trainingDays: number = exerciseHours.filter(
    hours => hours !== 0,
  ).length;
  const success: boolean = average >= target;
  let rating: Rating = 1;
  let ratingDescription: RatingDescription =
    "you got this, keep trying harder!";

  switch (true) {
    case trainingDays >= 4:
      rating = 3;
      ratingDescription = "wow you're doing great, keep it up!";
      break;
    case trainingDays >= 2:
      rating = 2;
      ratingDescription = "not too bad but could be better";
      break;
    case trainingDays >= 0:
      rating = 1;
      ratingDescription = "you got this, keep trying harder!";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { exerciseHours, target } = parseExerciseHourArguments(process.argv);
  console.log(calculateExercises(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
