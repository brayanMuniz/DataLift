import pandas as pd
from scipy.stats import linregress
import matplotlib.dates as mdates

# Load the workout data
file_path = './strong.csv'
workout_data = pd.read_csv(file_path)

# Function to estimate 1 rep max
def epley_formula(weight, reps):
    return weight * (1 + reps / 30)

# Apply the Epley formula to each row in the DataFrame to estimate 1RM
workout_data['Estimated 1RM'] = workout_data.apply(lambda row: epley_formula(row['Weight'], row['Reps']), axis=1)

# Group by 'Exercise Name' and 'Date', then calculate the max 1RM for each group
grouped_1rm = workout_data.groupby(['Exercise Name', 'Date'])['Estimated 1RM'].max().reset_index()

# Convert 'Date' from string to datetime
grouped_1rm['Date'] = pd.to_datetime(grouped_1rm['Date'])

# Now, let's create a JSON structure with each exercise's max 1RM trend over time
exercise_1rm_trends = {}

for exercise in grouped_1rm['Exercise Name'].unique():
    exercise_data = grouped_1rm[grouped_1rm['Exercise Name'] == exercise]
    exercise_data.sort_values('Date', inplace=True)
    
    # Prepare the data for trend line calculation
    x = pd.to_datetime(exercise_data['Date']).map(mdates.date2num)  # Convert dates to numerical format
    y = exercise_data['Estimated 1RM']
    slope, intercept, r_value, p_value, std_err = linregress(x, y)
    
    # Generate values for the trend line
    trend_line = slope * x + intercept
    
    # Convert trend line data to list of dictionaries for JSON conversion
    trend_data = [{'date': str(date), 'trend_1RM': float(estimate)} for date, estimate in zip(exercise_data['Date'], trend_line)]
    
    # Store in our results dictionary
    exercise_1rm_trends[exercise] = trend_data

# Convert the complete dictionary to JSON
import json
json_output = json.dumps(exercise_1rm_trends, indent=2)

# The json_output variable is a string in JSON format containing the 1RM trends for each exercise
print(json_output)
