#!/usr/bin/env python3
"""
MCP Server for Airwave Fitness Intelligence
Provides AI agents with access to ChromaDB-powered fitness insights
"""

import asyncio
import json
import logging
from typing import Any, Dict, List, Optional, Sequence
from datetime import datetime, timedelta

from mcp import Tool
from mcp.server import Server
from mcp.types import (
    TextContent,
    ImageContent,
    EmbeddedResource,
    LoggingLevel
)

# Import our ChromaDB fitness intelligence functions
from .chroma_setup import (
    get_chroma_client,
    create_collections,
    create_workout_embedding,
    store_workout_in_chroma,
    find_similar_workouts,
    analyze_user_patterns
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("airwave-mcp")

# Initialize ChromaDB client and collections
chroma_client = get_chroma_client()
collections = create_collections(chroma_client)
workouts_collection = collections['workouts']

app = Server("airwave-fitness-mcp")

@app.list_tools()
async def list_tools() -> List[Tool]:
    """List available MCP tools for fitness intelligence"""
    return [
        Tool(
            name="analyze_workout_patterns",
            description="Analyze a user's workout patterns and provide AI-powered insights and recommendations",
            inputSchema={
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier"
                    },
                    "recent_workouts": {
                        "type": "array",
                        "description": "Array of recent workout objects",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {"type": "string"},
                                "activity_type": {"type": "string"},
                                "duration": {"type": "number"},
                                "distance": {"type": "number"},
                                "heart_rate_avg": {"type": "number"},
                                "heart_rate_max": {"type": "number"},
                                "intensity": {"type": "string"},
                                "date": {"type": "string"},
                                "vo2max_estimate": {"type": "number"}
                            }
                        }
                    }
                },
                "required": ["user_id"]
            }
        ),
        Tool(
            name="find_similar_workouts",
            description="Find workouts similar to a given workout using vector similarity search",
            inputSchema={
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier"
                    },
                    "workout_data": {
                        "type": "object",
                        "description": "Workout data to find similar workouts for",
                        "properties": {
                            "activity_type": {"type": "string"},
                            "duration": {"type": "number"},
                            "distance": {"type": "number"},
                            "heart_rate_avg": {"type": "number"},
                            "heart_rate_max": {"type": "number"},
                            "intensity": {"type": "string"},
                            "vo2max_estimate": {"type": "number"}
                        }
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Maximum number of similar workouts to return",
                        "default": 5,
                        "minimum": 1,
                        "maximum": 20
                    }
                },
                "required": ["user_id", "workout_data"]
            }
        ),
        Tool(
            name="generate_workout_recommendations",
            description="Generate personalized workout recommendations based on user's fitness profile and history",
            inputSchema={
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier"
                    },
                    "fitness_goals": {
                        "type": "array",
                        "description": "User's fitness goals (e.g., 'improve_vo2max', 'build_endurance', 'lose_weight')",
                        "items": {"type": "string"}
                    },
                    "current_fitness_level": {
                        "type": "object",
                        "description": "User's current fitness metrics",
                        "properties": {
                            "vo2max_estimate": {"type": "number"},
                            "avg_weekly_distance": {"type": "number"},
                            "preferred_activities": {"type": "array", "items": {"type": "string"}},
                            "experience_level": {"type": "string", "enum": ["beginner", "intermediate", "advanced"]}
                        }
                    },
                    "constraints": {
                        "type": "object",
                        "description": "User constraints and preferences",
                        "properties": {
                            "available_time": {"type": "number", "description": "Minutes per workout"},
                            "equipment_access": {"type": "array", "items": {"type": "string"}},
                            "injury_concerns": {"type": "array", "items": {"type": "string"}},
                            "schedule_preferences": {"type": "array", "items": {"type": "string"}}
                        }
                    }
                },
                "required": ["user_id"]
            }
        ),
        Tool(
            name="predict_performance_trends",
            description="Analyze historical data to predict future performance trends and plateaus",
            inputSchema={
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier"
                    },
                    "metric": {
                        "type": "string",
                        "description": "Performance metric to analyze",
                        "enum": ["vo2max", "endurance", "speed", "heart_rate_recovery"]
                    },
                    "timeframe_weeks": {
                        "type": "integer",
                        "description": "Number of weeks to analyze for trends",
                        "default": 12,
                        "minimum": 4,
                        "maximum": 52
                    }
                },
                "required": ["user_id", "metric"]
            }
        ),
        Tool(
            name="store_workout_for_analysis",
            description="Store a completed workout in the vector database for future AI analysis",
            inputSchema={
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier"
                    },
                    "workout_data": {
                        "type": "object",
                        "description": "Complete workout data to store",
                        "properties": {
                            "id": {"type": "string"},
                            "activity_type": {"type": "string"},
                            "duration": {"type": "number"},
                            "distance": {"type": "number"},
                            "heart_rate_avg": {"type": "number"},
                            "heart_rate_max": {"type": "number"},
                            "intensity": {"type": "string"},
                            "date": {"type": "string"},
                            "vo2max_estimate": {"type": "number"}
                        },
                        "required": ["id", "activity_type", "duration"]
                    }
                },
                "required": ["user_id", "workout_data"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Dict[str, Any]) -> List[TextContent]:
    """Execute MCP tool calls for fitness intelligence"""

    try:
        if name == "analyze_workout_patterns":
            user_id = arguments["user_id"]
            recent_workouts = arguments.get("recent_workouts", [])

            # Analyze patterns using ChromaDB
            analysis = analyze_user_patterns(workouts_collection, user_id, recent_workouts)

            response = f"""## 🧠 AI Fitness Analysis for User {user_id}

### 💡 Key Insights:
{chr(10).join(f"• {insight}" for insight in analysis['insights'])}

### 🎯 Personalized Recommendations:
{chr(10).join(f"• {rec}" for rec in analysis['recommendations'])}

### 📊 Training Stats:
• **Total Workouts Logged**: {analysis['stats']['total_workouts']}
• **Activity Variety**: {', '.join(analysis['stats']['activity_types'])}
• **Average Intensity**: {'Low' if analysis['stats']['avg_intensity'] < 0.8 else 'High' if analysis['stats']['avg_intensity'] > 1.5 else 'Moderate'}
• **VO2 Max Progression**: {analysis['stats']['vo2_progression'][-3:] if analysis['stats']['vo2_progression'] else 'Not enough data yet'}
"""

        elif name == "find_similar_workouts":
            user_id = arguments["user_id"]
            workout_data = arguments["workout_data"]
            limit = arguments.get("limit", 5)

            # Create embedding for the workout
            embedding = create_workout_embedding(workout_data)

            # Find similar workouts
            similar_workouts = find_similar_workouts(workouts_collection, embedding, user_id, limit)

            response = f"""## 🔍 Similar Workouts Analysis

Found {len(similar_workouts)} similar workouts in your history:

"""

            for i, workout in enumerate(similar_workouts, 1):
                response += f"""### #{i} - {workout['activity_type'].title()} Workout
• **Date**: {workout['date']}
• **Duration**: {workout['duration']} minutes
• **Distance**: {workout['distance']} km
• **Intensity**: {workout['intensity'].title()}
• **VO2 Max**: {workout['vo2max_estimate']} mL/kg/min
• **Similarity Score**: {workout['similarity_score']:.2%}
• **Performance Match**: {workout['similarity_score']*100:.0f}% similar

"""

        elif name == "generate_workout_recommendations":
            user_id = arguments["user_id"]
            fitness_goals = arguments.get("fitness_goals", [])
            current_fitness = arguments.get("current_fitness_level", {})
            constraints = arguments.get("constraints", {})

            # Get user's workout history for context
            user_analysis = analyze_user_patterns(workouts_collection, user_id, [])

            # Generate AI-powered recommendations
            recommendations = []

            # Base recommendations on goals
            if "improve_vo2max" in fitness_goals:
                vo2_current = current_fitness.get("vo2max_estimate", 35)
                if vo2_current < 35:
                    recommendations.append("**VO2 Max Focus**: Incorporate 2-3 sessions of 20-30 minute continuous running at moderate intensity (70-80% max HR) weekly.")
                else:
                    recommendations.append("**VO2 Max Maintenance**: Continue with interval training mixing high-intensity efforts with recovery periods.")

            if "build_endurance" in fitness_goals:
                avg_weekly = current_fitness.get("avg_weekly_distance", 0)
                if avg_weekly < 20:
                    recommendations.append("**Endurance Building**: Gradually increase weekly distance by 10% per week. Focus on long, slow distance sessions.")
                else:
                    recommendations.append("**Endurance Maintenance**: Include one long workout (2-3x normal distance) weekly to maintain aerobic base.")

            if "lose_weight" in fitness_goals:
                recommendations.append("**Weight Management**: Combine moderate-intensity cardio (45-60 min) with strength training 3-4x weekly for optimal calorie burn.")

            # Add personalized insights based on history
            if user_analysis['stats']['total_workouts'] > 0:
                if len(user_analysis['stats']['activity_types']) == 1:
                    recommendations.append("**Cross-Training**: Add variety to prevent overuse injuries and improve overall fitness.")
                if user_analysis['stats']['avg_intensity'] < 0.8:
                    recommendations.append("**Progressive Overload**: Gradually increase workout intensity every 1-2 weeks to continue improving.")

            response = f"""## 🎯 AI Workout Recommendations for User {user_id}

### 🏆 Based on Your Goals: {', '.join(fitness_goals) if fitness_goals else 'General Fitness'}

{chr(10).join(f"### {i+1}. {rec}" for i, rec in enumerate(recommendations))}

### 📊 Your Current Profile:
• **VO2 Max Estimate**: {current_fitness.get('vo2max_estimate', 'Unknown')} mL/kg/min
• **Weekly Distance**: {current_fitness.get('avg_weekly_distance', 'Unknown')} km
• **Experience Level**: {current_fitness.get('experience_level', 'Unknown')}
• **Preferred Activities**: {', '.join(current_fitness.get('preferred_activities', ['None specified']))}

### ⏰ Considering Your Constraints:
• **Available Time**: {constraints.get('available_time', 'Not specified')} minutes per session
• **Equipment**: {', '.join(constraints.get('equipment_access', ['Not specified']))}
• **Concerns**: {', '.join(constraints.get('injury_concerns', ['None specified']))}

Remember to listen to your body and consult with a healthcare professional before starting any new exercise program!"""

        elif name == "predict_performance_trends":
            user_id = arguments["user_id"]
            metric = arguments["metric"]
            timeframe_weeks = arguments.get("timeframe_weeks", 12)

            # Get user's historical data
            user_workouts = workouts_collection.get(where={"user_id": user_id})

            if not user_workouts['ids']:
                response = f"## 📈 Performance Trend Analysis for User {user_id}

❌ **Insufficient Data**: No workout history found for trend analysis.

**Recommendation**: Log at least 4-6 weeks of consistent workouts to enable performance trend analysis."
            else:
                # Analyze trends based on available data
                vo2_trend = []
                for metadata in user_workouts['metadatas']:
                    if metadata.get('vo2max_estimate', 0) > 0:
                        vo2_trend.append(metadata['vo2max_estimate'])

                if len(vo2_trend) >= 3:
                    trend_direction = "improving" if vo2_trend[-1] > vo2_trend[0] else "plateauing"
                    avg_improvement = (vo2_trend[-1] - vo2_trend[0]) / len(vo2_trend)

                    response = f"""## 📈 Performance Trend Analysis for User {user_id}

### 📊 {metric.upper()} Trend Analysis ({timeframe_weeks} weeks):

• **Current Trend**: {'📈 Improving' if trend_direction == 'improving' else '📊 Plateauing/Maintaining'}
• **Average Weekly Change**: {avg_improvement:.2f} units
• **Data Points**: {len(vo2_trend)} measurements
• **Current Level**: {vo2_trend[-1]:.1f}

### 🎯 Recommendations:
• **If Improving**: Continue current training approach - it's working!
• **If Plateauing**: Consider periodization, cross-training, or increased training volume
• **Next Milestone**: Aim for {vo2_trend[-1] + 2:.1f} in the next 4-6 weeks

**Keep tracking workouts to see how interventions affect your performance trends!**"""
                else:
                    response = f"""## 📈 Performance Trend Analysis for User {user_id}

⚠️ **Limited Data**: Only {len(vo2_trend)} data points available for trend analysis.

**Need**: At least 3 data points for meaningful trend analysis.

**Keep logging workouts consistently to unlock detailed performance trend insights!**"""

        elif name == "store_workout_for_analysis":
            user_id = arguments["user_id"]
            workout_data = arguments["workout_data"]

            # Store workout in ChromaDB for future AI analysis
            workout_id = store_workout_in_chroma(workouts_collection, workout_data, user_id)

            response = f"""## 💾 Workout Stored for AI Analysis

✅ **Successfully stored workout** `{workout_id}` for user `{user_id}`

### 📊 Workout Details:
• **Activity**: {workout_data.get('activity_type', 'Unknown')}
• **Duration**: {workout_data.get('duration', 0)} minutes
• **Distance**: {workout_data.get('distance', 0)} km
• **Intensity**: {workout_data.get('intensity', 'moderate')}

### 🤖 AI Benefits:
• **Similarity Search**: Future workouts can be compared to this one
• **Pattern Recognition**: Contributes to personalized recommendations
• **Trend Analysis**: Helps predict future performance
• **Intelligent Insights**: Enables AI-powered fitness coaching

**This workout is now part of your AI-powered fitness intelligence system!** 🧠💪"""

        else:
            response = f"Unknown tool: {name}"

        return [TextContent(type="text", text=response)]

    except Exception as e:
        logger.error(f"Error executing tool {name}: {e}")
        return [TextContent(
            type="text",
            text=f"❌ **Error executing {name}**: {str(e)}\n\nPlease check your input parameters and try again."
        )]

async def main():
    """Main MCP server entry point"""
    logger.info("Starting Airwave Fitness Intelligence MCP Server...")

    # Import here to avoid issues if mcp package isn't available
    from mcp.server.stdio import stdio_server

    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main())
