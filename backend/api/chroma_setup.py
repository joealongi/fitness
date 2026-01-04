import chromadb
import json
from datetime import datetime
import numpy as np

def get_chroma_client():
    """Initialize ChromaDB client with persistent storage"""
    client = chromadb.PersistentClient(path="./chroma_db")
    return client

def create_collections(client):
    """Create all necessary ChromaDB collections for fitness intelligence"""
    collections = {}

    # Collection for workout embeddings and similarity search
    collections['workouts'] = client.get_or_create_collection(
        name="fitness_workouts",
        metadata={"description": "Vectorized workout data for similarity search and pattern recognition"}
    )

    # Collection for user performance patterns
    collections['user_patterns'] = client.get_or_create_collection(
        name="user_performance_patterns",
        metadata={"description": "User-specific performance trends and correlations"}
    )

    # Collection for workout recommendations
    collections['recommendations'] = client.get_or_create_collection(
        name="workout_recommendations",
        metadata={"description": "AI-generated workout recommendations and insights"}
    )

    return collections

def create_workout_embedding(workout_data):
    """Create a vector embedding from workout data for ChromaDB storage"""
    # Extract key features for vectorization
    features = [
        workout_data.get('duration', 0) / 60,  # Convert to hours
        workout_data.get('distance', 0),       # Distance in km
        workout_data.get('heart_rate_avg', 0) / 200,  # Normalized HR
        workout_data.get('heart_rate_max', 0) / 200,  # Normalized max HR
        {'run': 0, 'cycle': 1, 'walk': 2, 'swim': 3, 'other': 4}.get(workout_data.get('activity_type', 'other'), 4) / 4,
        {'low': 0, 'moderate': 1, 'high': 2}.get(workout_data.get('intensity', 'moderate'), 1) / 2,
    ]

    # Add VO2 max estimate if available (normalized)
    vo2_estimate = workout_data.get('vo2max_estimate', 35) / 80  # Normalize to 0-1 range
    features.append(vo2_estimate)

    # Convert to numpy array and ensure consistent length
    embedding = np.array(features, dtype=np.float32)

    # Add some derived features
    embedding = np.concatenate([
        embedding,
        [embedding[0] * embedding[1]],  # Duration × Distance (volume proxy)
        [embedding[2] * embedding[0]],  # Avg HR × Duration (cardio stress)
        [embedding[1] / max(embedding[0], 0.1)],  # Speed proxy
    ])

    return embedding.tolist()

def store_workout_in_chroma(collection, workout_data, user_id):
    """Store a workout in ChromaDB with vector embedding"""
    workout_id = f"{user_id}_{workout_data.get('id', datetime.now().isoformat())}"

    # Create embedding from workout data
    embedding = create_workout_embedding(workout_data)

    # Prepare metadata
    metadata = {
        'user_id': user_id,
        'activity_type': workout_data.get('activity_type', 'unknown'),
        'intensity': workout_data.get('intensity', 'moderate'),
        'date': workout_data.get('date', datetime.now().isoformat()),
        'duration': workout_data.get('duration', 0),
        'distance': workout_data.get('distance', 0),
        'heart_rate_avg': workout_data.get('heart_rate_avg', 0),
        'heart_rate_max': workout_data.get('heart_rate_max', 0),
        'vo2max_estimate': workout_data.get('vo2max_estimate', 0),
    }

    # Create document string for semantic search
    document = f"""
    User {user_id} completed a {workout_data.get('activity_type', 'unknown')} workout on {workout_data.get('date', 'unknown date')}.
    Duration: {workout_data.get('duration', 0)} minutes, Distance: {workout_data.get('distance', 0)} km.
    Intensity: {workout_data.get('intensity', 'moderate')}, Average Heart Rate: {workout_data.get('heart_rate_avg', 0)} bpm.
    Estimated VO2 Max: {workout_data.get('vo2max_estimate', 0)} mL/kg/min.
    """

    # Store in ChromaDB
    collection.add(
        ids=[workout_id],
        embeddings=[embedding],
        metadatas=[metadata],
        documents=[document]
    )

    return workout_id

def find_similar_workouts(collection, workout_embedding, user_id, n_results=5):
    """Find similar workouts using vector similarity search"""
    results = collection.query(
        query_embeddings=[workout_embedding],
        n_results=n_results + 10,  # Get more to filter
        where={"user_id": user_id}  # Only user's own workouts for now
    )

    # Filter and format results
    similar_workouts = []
    for i in range(len(results['ids'][0])):
        if len(similar_workouts) >= n_results:
            break

        workout_id = results['ids'][0][i]
        metadata = results['metadatas'][0][i]
        distance = results['distances'][0][i]

        similar_workouts.append({
            'workout_id': workout_id,
            'similarity_score': 1 - distance,  # Convert distance to similarity
            'activity_type': metadata.get('activity_type'),
            'date': metadata.get('date'),
            'duration': metadata.get('duration'),
            'distance': metadata.get('distance'),
            'intensity': metadata.get('intensity'),
            'vo2max_estimate': metadata.get('vo2max_estimate'),
        })

    return similar_workouts

def analyze_user_patterns(collection, user_id, recent_workouts):
    """Analyze user workout patterns and generate insights"""
    if not recent_workouts:
        return {"insights": [], "recommendations": []}

    # Get user's workout history from ChromaDB
    user_workouts = collection.get(where={"user_id": user_id})

    if not user_workouts['ids']:
        return {"insights": ["Welcome! Start logging workouts to unlock AI insights."], "recommendations": []}

    # Analyze patterns
    insights = []
    recommendations = []

    # Analyze workout frequency
    workout_count = len(user_workouts['ids'])
    if workout_count < 3:
        insights.append("Keep logging workouts! AI insights improve with more data.")
    elif workout_count < 10:
        insights.append("Great progress! You're building a solid workout history.")
    else:
        insights.append("Excellent consistency! Your workout data is revealing meaningful patterns.")

    # Analyze activity diversity
    activity_types = set()
    for metadata in user_workouts['metadatas']:
        activity_types.add(metadata.get('activity_type', 'unknown'))

    if len(activity_types) == 1:
        recommendations.append("Try cross-training! Adding variety can improve overall fitness and reduce injury risk.")
    elif len(activity_types) >= 3:
        insights.append("Great variety in your training! Cross-training supports well-rounded fitness.")

    # Analyze intensity patterns
    intensities = []
    for metadata in user_workouts['metadatas']:
        intensity = metadata.get('intensity', 'moderate')
        intensities.append({'low': 0, 'moderate': 1, 'high': 2}.get(intensity, 1))

    avg_intensity = sum(intensities) / len(intensities) if intensities else 1

    if avg_intensity < 0.8:
        recommendations.append("Consider increasing workout intensity gradually to maximize cardiovascular benefits.")
    elif avg_intensity > 1.5:
        recommendations.append("High-intensity training is great! Ensure adequate recovery between intense sessions.")

    # VO2 max progression analysis
    vo2_estimates = []
    for metadata in user_workouts['metadatas']:
        vo2 = metadata.get('vo2max_estimate', 0)
        if vo2 > 0:
            vo2_estimates.append(vo2)

    if len(vo2_estimates) >= 2:
        recent_avg = sum(vo2_estimates[-3:]) / min(3, len(vo2_estimates))
        if recent_avg > 40:
            insights.append("Excellent aerobic fitness! You're in the top percentile for cardiovascular health.")
        elif recent_avg > 35:
            insights.append("Good aerobic capacity! Consistent training is yielding results.")
        elif recent_avg < 30 and len(vo2_estimates) > 5:
            recommendations.append("Focus on aerobic training to improve VO2 max. Longer, moderate-intensity workouts can help.")

    return {
        "insights": insights,
        "recommendations": recommendations,
        "stats": {
            "total_workouts": workout_count,
            "activity_types": list(activity_types),
            "avg_intensity": avg_intensity,
            "vo2_progression": vo2_estimates[-5:] if len(vo2_estimates) >= 5 else vo2_estimates
        }
    }

if __name__ == "__main__":
    client = get_chroma_client()
    collections = create_collections(client)
    print("ChromaDB fitness intelligence setup complete!")
    print(f"Collections created: {list(collections.keys())}")
