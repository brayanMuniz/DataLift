import { ExerciseTrends } from './types/trendData';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

interface LineChartProps {
    exerciseTrends: ExerciseTrends;
    exerciseName: string;
    dataReady: boolean;
}

export default function LineChart({ exerciseTrends, exerciseName, dataReady }: LineChartProps) {
    if (!dataReady || !exerciseTrends[exerciseName]) {
        return <div>Loading...</div>;
    }

    const exerciseData = exerciseTrends[exerciseName];

    // Generate labels and data points from exerciseData
    const labels = exerciseData.map(data => data.date.split('T')[0]); // Assuming ISO date format, just get the date part
    const trendData = exerciseData.map(data => data.trend_1RM);

    const data = {
        labels,
        datasets: [
            {
                label: exerciseName,
                data: trendData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    return <Line options={options} data={data} />;
}

