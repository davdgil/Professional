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
        url: "http://localhost:9000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          //bearerFormat: "JWT"
        },
      },
        schemas: {
          User: {
            type: "object",
            properties: {
              id: {
                type: "string",
                format: "uuid",
                description: "Identificador único para el usuario generado automáticamente por uuidv4."
              },
              email: {
                type: "string",
                format: "email",
                description: "Correo electrónico del usuario. Debe ser único."
              },
              password: {
                type: "string",
                format: "password",
                description: "Contraseña del usuario. No se devolverá en las respuestas de la API."
              },
              role: {
                type: "string",
                enum: ["admin", "comerciante", "usuario", "anonimo"],
                default: "usuario",
                description: "El rol del usuario dentro del sistema. Por defecto es 'usuario'."
              },
              city: {
                type: "string",
                description: "Ciudad de residencia del usuario."
              },
              interests: {
                type: "string",
                items: {
                  type: "string"
                },
                description: "Lista de intereses del usuario."
              },
              isActive: {
                type: "boolean"

              }
            },
            required: ["email", "password", "city"],
            example: {
              email: "usuario@example.com",
              password: "password123",
              role: "usuario",
              city: "Ciudad Metrópolis",
              interests: "hamburguesas",
              isActive: true

            }
          },
          Commerce: {
            type: "object",
            required: ["commerceName", "email", "cif", "address"],
            properties: {
              commerceName: {
                type: "string",
                description: "Nombre del comercio."
              },
              email: {
                type: "string",
                format: "email",
                description: "Correo electrónico del comercio. Debe ser único."
              },
              phone: {
                type: "string",
                description: "Teléfono de contacto del comercio."
              },
              cif: {
                type: "string",
                description: "CIF del comercio. Debe ser único."
              },
              address: {
                type: "string",
                description: "Dirección física del comercio."
              },
              merchant: {
                type: "string",
                description: "Identificador único del comerciante asociado a este comercio."
              }
            }
          }
          
        }
    }
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
