const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "u-tad",
        url: "https://u-tad.com",
        email: "david.gil@u-tad.com",
      },
    },
    servers: [
      {
        url: "http://localhost:9000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            password: {
              type: "string",
              description: "Contraseña del usuario",
            },
            role: {
              type: "string",
              enum: ["admin", "comerciante", "usuario", "anonimo"],
              default: "usuario",
              description: "Rol del usuario",
            },
            city: {
              type: "string",
              description: "Ciudad del usuario",
            },
            interests: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Intereses del usuario",
            },
          },
          required: ["email", "password", "city"], // Campos requeridos
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
