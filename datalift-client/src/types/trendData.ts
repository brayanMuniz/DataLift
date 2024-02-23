type TrendData = {
    date: string;  // Date is in ISO format 'YYYY-MM-DDTHH:mm:ss'
    trend_1RM: number;
};

type ExerciseTrends = {
    [exerciseName: string]: TrendData[];
};

export type { TrendData, ExerciseTrends };
