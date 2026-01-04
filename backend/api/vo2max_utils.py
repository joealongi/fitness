import math

def estimate_vo2max_cooper(distance_meters, time_minutes, gender):
    """
    Estimate VO2 max using Cooper test formula.
    Assumes 12-minute run, adjust if necessary.
    """
    # Adjust distance for time if not 12 min
    if time_minutes != 12:
        distance_meters = distance_meters * (12 / time_minutes)

    if gender == 'male':
        vo2max = (distance_meters - 504.9) / 44.73
    elif gender == 'female':
        vo2max = (distance_meters - 504.1) / 44.73
    else:
        # Average
        vo2max = (distance_meters - 504.5) / 44.73

    return max(0, vo2max)  # Ensure non-negative

def estimate_vo2max_heart_rate(max_hr, resting_hr):
    """
    Estimate VO2 max using heart rate ratio.
    """
    if resting_hr > 0:
        vo2max = 15.3 * (max_hr / resting_hr)
    else:
        vo2max = None
    return vo2max

def estimate_vo2max_from_workout(workout, profile):
    """
    Estimate VO2 max from workout data.
    """
    if workout.distance and workout.activity_type == 'run':
        distance_m = workout.distance * 1000  # km to m
        vo2max = estimate_vo2max_cooper(distance_m, workout.duration, profile.gender)
    elif workout.max_heart_rate and profile.age:
        # Use actual max HR from workout if available
        max_hr = workout.max_heart_rate
        # Assume resting HR 70 if not available
        resting_hr = 70
        vo2max = estimate_vo2max_heart_rate(max_hr, resting_hr)
    elif profile.age:
        # Estimate max HR as 208 - 0.7 * age if no workout HR data
        estimated_max_hr = 208 - 0.7 * profile.age
        resting_hr = 70
        vo2max = estimate_vo2max_heart_rate(estimated_max_hr, resting_hr)
    else:
        vo2max = None

    return vo2max

def get_vo2max_benefits(vo2max):
    """
    Provide benefits based on VO2 max.
    """
    if vo2max is None:
        return "Unable to estimate VO2 max."

    benefits = []
    if vo2max < 30:
        benefits.append("Low VO2 max indicates room for improvement in aerobic fitness.")
    elif vo2max < 40:
        benefits.append("Moderate VO2 max; regular training can significantly improve it.")
    else:
        benefits.append("Good VO2 max; maintain with consistent exercise.")

    # General benefits
    benefits.append("Higher VO2 max correlates with lower risk of cardiovascular disease.")
    benefits.append("Improves endurance and overall health.")

    return " ".join(benefits)
