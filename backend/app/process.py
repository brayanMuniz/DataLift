import pandas as pd
from scipy.stats import linregress
import matplotlib.dates as mdates
import json

def process_csv(file_path):
    workout_data = pd.read_csv(file_path)

    def epley_formula(weight, reps):
        return weight * (1 + reps / 30)

    workout_data['Estimated 1RM'] = workout_data.apply(lambda row: epley_formula(row['Weight'], row['Reps']), axis=1)
    grouped_1rm = workout_data.groupby(['Exercise Name', 'Date'])['Estimated 1RM'].max().reset_index()
    grouped_1rm['Date'] = pd.to_datetime(grouped_1rm['Date'])

    exercise_1rm_trends = {}

    for exercise in grouped_1rm['Exercise Name'].unique():
        exercise_data = grouped_1rm[grouped_1rm['Exercise Name'] == exercise]
        exercise_data.sort_values('Date', inplace=True)

        x = pd.to_datetime(exercise_data['Date']).map(mdates.date2num)
        y = exercise_data['Estimated 1RM']
        slope, intercept, r_value, p_value, std_err = linregress(x, y)

        trend_line = slope * x + intercept
        trend_data = [{'date': str(date), 'trend_1RM': float(estimate)} for date, estimate in zip(exercise_data['Date'], trend_line)]
        exercise_1rm_trends[exercise] = trend_data

    json_output = json.dumps(exercise_1rm_trends, indent=2)
    return json_output
