import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  swaggerDefinition: {
    restapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API REST description personnage de League of legends simplifié",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

export default setupSwagger;