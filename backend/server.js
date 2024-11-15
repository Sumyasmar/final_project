import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import errorHandler from "./src/helpers/errorhandler.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic CORS setup
const allowedOrigins = [process.env.CLIENT_URL]; // Add other URLs if needed
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Error handler middleware
app.use(errorHandler);

// Function to dynamically load routes
const loadRoutes = async () => {
  const routeFiles = fs.readdirSync("./src/routes");

  await Promise.all(
    routeFiles.map(async (file) => {
      try {
        const route = await import(`./src/routes/${file}`);
        app.use("/api/v1", route.default);
      } catch (err) {
        console.error(`Failed to load route file ${file}:`, err.message);
      }
    })
  );
};

// Start server function
const server = async () => {
  try {
    await connect();

    // Load routes before starting the server
    await loadRoutes();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

server();
