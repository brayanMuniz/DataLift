type TrendData = {
    date: string;  // Assuming date is in ISO format 'YYYY-MM-DDTHH:mm:ss'
    trend_1RM: number;
};

type ExerciseTrends = {
    [exerciseName: string]: TrendData[];
};

export type { TrendData, ExerciseTrends };

// // Example usage:
// const exampleTrends: ExerciseTrends = {
//     "ATG Pause Split Squat": [
//         {
//             date: "2021-03-05T12:27:02",
//             trend_1RM: 9.811015534611656
//         },
//         {
//             date: "2021-03-06T11:55:24",
//             trend_1RM: 9.8127804002363
//         },
//         // ... more data points
//     ],
//     // ... more exercises
// };
