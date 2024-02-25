import React, { useState } from 'react';
import Axios from 'axios';
import LineChart from "./LineChart";
import SelectExercise from "./SelectExercise";
import { ExerciseTrends } from "./types/trendData";
export default function App() {

  const [file, setFile] = useState<File | null>(null);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [exerciseTrends, setExerciseTrends] = useState<ExerciseTrends>({}); // This holds data for all exercises
  const [exerciseNames, setExerciseNames] = useState<string[]>([]); // Holds the names of all the exercises
  const [exerciseName, setExerciseName] = useState<string>(""); // Holds the name of the selected exercise


  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]); // Set the selected file
    }
  };

  // Function to handle form submission
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    if (file) {
      const formData = new FormData();
      formData.append('file', file); // Append the file to the form data

      try {
        const response = await Axios.post('http://127.0.0.1:5000/process', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });


        if (response.data) {
          setExerciseNames(Object.keys(response.data));
          setExerciseTrends(response.data);
          setDataReady(true);
        }

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSelectExercise = (selectedExerciseName: string) => {
    setExerciseName(selectedExerciseName);
  };

  return (
    <div>
      <h1>Exercise Trend Chart</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload CSV</button>
      </form>
      {dataReady && (
        <SelectExercise
          exerciseNames={exerciseNames}
          selectedExercise={exerciseName}
          onSelectExercise={handleSelectExercise}
        />
      )}
      <LineChart dataReady={dataReady} exerciseTrends={exerciseTrends} exerciseName={exerciseName} />
    </div>
  );
}
