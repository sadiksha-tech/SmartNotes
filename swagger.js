// src/middleware/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SmartNotes API Documentation",
      version: "1.0.0",
      description:
        "API documentation for the SmartNotes project, including Authentication & Notes CRUD operations.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  // Scan route files
  apis: ["./src/routes/*.js"],
};

// Generate documentation
const swaggerSpec = swaggerJsdoc(options);

// Export Swagger UI middleware
module.exports = {
  swaggerUi,
  swaggerSpec,
};
