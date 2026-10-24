import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, "../Frontend/dist");
const allowedOrigins = [
  "http://localhost:3001",
  process.env.RENDER_EXTERNAL_URL,
].filter(Boolean);

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

const mongoConnectionString = DB_NAME && !/mongodb(?:\+srv)?:\/\/[^/]+\/[^?]+/.test(URI)
  ? (() => {
      const [baseUri, query] = URI.split("?");
      return `${baseUri.replace(/\/$/, "")}/${DB_NAME}${query ? `?${query}` : ""}`;
    })()
  : URI;

mongoose
  .connect(mongoConnectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// In production, serve the built React app from this same origin as the API
// and Socket.IO server. During local development Vite serves the frontend.
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

async function startServer() {
  if (!URI) {
    throw new Error("MONGODB_URI is required");
  }

  await mongoose.connect(mongoConnectionString);
  console.log("Connected to MongoDB");

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error.message);
  process.exit(1);
});
