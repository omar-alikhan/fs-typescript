type Rating = 1 | 2 | 3;
type RatingDescription = "you got this, keep trying harder!" |"not too bad but could be better" | "wow you're doing great, keep it up!"

interface ExerciseResult { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: RatingDescription,
  target: number,
  average: number
}

const calculateExercises = (exerciseHours: number [], target: number): ExerciseResult => { 
    const periodLength: number = exerciseHours.length;
    const totalHours: number = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average: number = totalHours / periodLength;
    const trainingDays: number = exerciseHours.filter(hours => hours !== 0).length;
    const success: boolean = average >= target;
    let rating: Rating = 1;
    let ratingDescription: RatingDescription = "you got this, keep trying harder!"

    switch(true) {
        case trainingDays >= 4:
            rating = 3;
            ratingDescription = "wow you're doing great, keep it up!";
            break;
        case trainingDays >= 2:
            rating = 2;
            ratingDescription = "not too bad but could be better"
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
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));