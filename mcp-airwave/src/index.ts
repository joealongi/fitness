#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

class AirwaveServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "airwave-fitness-server",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "calculate_vo2max",
          description: "Calculate estimated VO2 max from workout data",
          inputSchema: {
            type: "object",
            properties: {
              distance: {
                type: "number",
                description: "Distance in kilometers",
              },
              time: {
                type: "number",
                description: "Time in minutes",
              },
              gender: {
                type: "string",
                enum: ["male", "female", "other"],
                description: "Gender for calculation",
              },
            },
            required: ["distance", "time", "gender"],
          },
        },
        {
          name: "get_fitness_tips",
          description: "Get personalized fitness tips based on VO2 max",
          inputSchema: {
            type: "object",
            properties: {
              vo2max: {
                type: "number",
                description: "VO2 max value",
              },
            },
            required: ["vo2max"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === "calculate_vo2max") {
        const args = request.params.arguments;
        if (
          !args ||
          typeof args.distance !== "number" ||
          typeof args.time !== "number" ||
          !args.gender
        ) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "Invalid parameters for calculate_vo2max"
          );
        }

        const distance_m = args.distance * 1000;
        const time_min = args.time;

        // Adjust for time
        const adjusted_distance = distance_m * (12 / time_min);

        // Cooper formula
        let vo2max;
        if (args.gender === "male") {
          vo2max = (adjusted_distance - 504.9) / 44.73;
        } else if (args.gender === "female") {
          vo2max = (adjusted_distance - 504.1) / 44.73;
        } else {
          vo2max = (adjusted_distance - 504.5) / 44.73;
        }

        return {
          content: [
            {
              type: "text",
              text: `Estimated VO2 max: ${Math.max(0, vo2max).toFixed(
                1
              )} mL/kg/min`,
            },
          ],
        };
      }

      if (request.params.name === "get_fitness_tips") {
        const args = request.params.arguments;
        if (!args || typeof args.vo2max !== "number") {
          throw new McpError(
            ErrorCode.InvalidParams,
            "Invalid parameters for get_fitness_tips"
          );
        }

        let tips = [];
        if (args.vo2max < 30) {
          tips.push(
            "Focus on building aerobic base with regular moderate exercise."
          );
        } else if (args.vo2max < 40) {
          tips.push(
            "Good progress! Incorporate interval training to boost VO2 max."
          );
        } else {
          tips.push(
            "Excellent aerobic fitness! Maintain with consistent training."
          );
        }

        tips.push(
          "Higher VO2 max correlates with reduced cardiovascular disease risk."
        );
        tips.push("Aim for gradual improvements through consistent training.");

        return {
          content: [
            {
              type: "text",
              text: tips.join(" "),
            },
          ],
        };
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${request.params.name}`
      );
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Airwave MCP server running on stdio");
  }
}

const server = new AirwaveServer();
server.run().catch(console.error);
