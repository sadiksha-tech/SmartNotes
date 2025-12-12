// ---------------------------------------
// 📌 Imports
// ---------------------------------------
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ---------------------------------------
// 📌 Swagger (Correct Import)
// ---------------------------------------
const { swaggerUi, swaggerSpec } = require("./swagger");

// ---------------------------------------
// 📌 Import Routes
// ---------------------------------------
const userRoutes = require("./src/routes/user.routes");
const notesRoutes = require("./src/routes/notes.routes");

// ---------------------------------------
// 📌 Import Error Handler
// ---------------------------------------
const errorHandler = require("./src/middleware/errorMiddleware");

// ---------------------------------------
// 📌 Create Express App
// ---------------------------------------
const app = express();

// ---------------------------------------
// 📌 Middleware
// ---------------------------------------
app.use(cors());
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------------------
// 📌 Swagger Docs Route
// ---------------------------------------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---------------------------------------
// 📌 API Routes
// ---------------------------------------
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

// ---------------------------------------
// 📌 Error Handler
// ---------------------------------------
app.use(errorHandler);

// ---------------------------------------
// 📌 Start Server
// ---------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api-docs`);
});
