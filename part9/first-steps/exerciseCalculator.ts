interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string | undefined;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyTrainingHours: number[],
  target: number
): Result => {
  const periodLength = dailyTrainingHours.length;
  const trainingDays = dailyTrainingHours.filter((hours) => hours > 0).length;
  const average = dailyTrainingHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = Math.round((1 - Math.abs(average - target) / target) * 2);
  const ratingDescription = ((rating) => {
    if (rating === 1) {
      return 'Good start!, Still long way to go!';
    }
    if (rating === 2) {
      return 'Looks good! but could be better!';
    }
    if (rating === 3) {
      return 'Great job! You are closer to your target!';
    }
  })(rating);

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
