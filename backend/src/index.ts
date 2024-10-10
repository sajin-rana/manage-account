// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";

// import authRoutes from "./routes/auth.route.js";

// import dotenv from "dotenv";
// import { app, server } from "./socket/socket.js";
// dotenv.config();

// const PORT = process.env.PORT || 5003;
// const __dirname = path.resolve();

// app.use(cookieParser()); // for parsing cookies
// app.use(express.json()); // for parsing application/json

// app.use("/api/auth", authRoutes);

// if (process.env.NODE_ENV !== "development") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

// import express from "express";
// import cookieParser from "cookie-parser";
// import path from "path";
// import cors from "cors"; // Import the cors package
// import authRoutes from "./routes/auth.route.js";
// import dotenv from "dotenv";
// import { app, server } from "./socket/socket.js";
// dotenv.config();

// const PORT = process.env.PORT || 5003;
// const __dirname = path.resolve();

// // CORS configuration
// const corsOptions = {
//   origin: "http://localhost:5173", // Allow requests from this origin
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
//   credentials: true, // Allow cookies and authentication headers
// };

// app.use(cors(corsOptions)); // Enable CORS with specified options

// app.use(cookieParser()); // for parsing cookies
// app.use(express.json()); // for parsing application/json

// app.use("/api/auth", authRoutes);

// if (process.env.NODE_ENV !== "development") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("Server is running on port " + PORT);
// });

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"; // Import the cors package
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { createServer } from "http"; // To create the HTTP server

dotenv.config();

const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  credentials: true, // Allow cookies and authentication headers
};

app.use(cors(corsOptions)); // Enable CORS with specified options

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// Create and start the HTTP server
const server = createServer(app);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
