import React, { useState } from 'react';
import Axios from 'axios';
import LineChart from "./LineChart";
import { ExerciseTrends } from "./types/trendData";

export default function App() {
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [exerciseTrends, setExerciseTrends] = useState<ExerciseTrends>({});
  const [exerciseName, setExerciseName] = useState<string>("Squats");

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
        // Make the API call using Axios
        const response = await Axios.post('http://127.0.0.1:5000/process', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Log the response data in the console
        console.log(response.data);

        // Optionally, set your state based on the response
        // setExerciseTrends(response.data);
        // setDataReady(true);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <h1>Exercise Trend Chart</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload CSV</button>
      </form>
      <LineChart dataReady={dataReady} exerciseTrends={exerciseTrends} exerciseName={exerciseName} />
    </div>
  );
}
