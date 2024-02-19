import LineChart from "./LineChart";
import { ExerciseTrends } from "./types/trendData";

export default function App() {
  // Fake example data
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

  // Choose an exercise to display in the LineChart
  const exerciseName = "Squats";

  return (
    <div>
      <h1>Exercise Trend Chart</h1>
      <LineChart exerciseTrends={fakeExerciseTrends} exerciseName={exerciseName} />
    </div>
  );
}
