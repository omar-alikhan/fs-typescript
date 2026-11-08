interface BmiValues {
  height: number;
  weight: number;
}

type BmiRange = "underweight" | "normal" | "overweight" | "obese";

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): BmiRange => {
  const heightInMetres = height / 100;
  const bmi: number = weight / heightInMetres ** 2;

  switch (true) {
    case bmi <= 18.5:
      return "underweight";
    case bmi <= 25.0:
      return "normal";
    case bmi <= 30:
      return "overweight";
    case bmi <= 40 || bmi >= 40:
      return "obese";
    default:
      throw new Error("Height and weight are not numbers!");
  }
};
try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
