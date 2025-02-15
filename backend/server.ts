import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import yaml from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Server } from "socket.io";
import http from "http";
import morgan from "morgan";
import "./utils/tokens.cleanup.utils";

import userRoutes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  console.log("client connected");
});

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Load Swagger YAML
const swaggerDocument = yaml.load("./swagger/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Export server and io
export { io, server, app };
