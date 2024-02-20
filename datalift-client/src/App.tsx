import LineChart from "./LineChart";
import { ExerciseTrends } from "./types/trendData";
import React, { useState, useEffect } from 'react';

const generateFakeData = () => {
  // Mimics dynamic data generation
  const fakeExerciseTrends: ExerciseTrends = {
    "Squats": [
      { date: "2021-01-01T12:00:00", trend_1RM: 100 },
      { date: "2021-02-01T12:00:00", trend_1RM: 105 },
      { date: "2021-03-01T12:00:00", trend_1RM: 110 },
    ],
    "Overhead Press": [
      { date: "2021-01-01T12:00:00", trend_1RM: 90 },
      { date: "2021-02-01T12:00:00", trend_1RM: 95 },
      { date: "2021-03-01T12:00:00", trend_1RM: 100 },
    ]
  };
  return fakeExerciseTrends;
};


export default function App() {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [exerciseTrends, setExerciseTrends] = useState<ExerciseTrends>({});
  const [exerciseName, setExerciseName] = useState<string>("Squats");

  useEffect(() => {
    // Mimic data fetching/generation on component mount
    const data = generateFakeData();
    setExerciseTrends(data);
    setDataReady(true);
  }, []);



  return (
    <div >
      <h1>Exercise Trend Chart</h1>
      <LineChart dataReady={dataReady} exerciseTrends={exerciseTrends} exerciseName={exerciseName} />
    </div>
  );
}
