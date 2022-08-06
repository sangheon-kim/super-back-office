import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openApi: '3.0.0',
    info: {
      title: "Sangheon's API",
      description: 'API Docs written by Sangheon',
      version: '1.0.0',
      contact: {
        name: '김상헌',
        email: 'ksj8367@gmail.com',
      },
      servers: [`http://${process.env.HOST}:${process.env.PORT}`],
    },
    // securityDefinitions: {
    //   bearerAuth: {
    //     type: 'apiKey',
    //     name: 'Authorization',
    //     in: 'header',
    //   },
    // },
    // security: [{ bearerAuth: [] }],
  },
  apis: ['src/api/routes/*.routes.ts'],
};

export const specs = swaggerJsdoc(options);
export const SwaggerUi = swaggerUi;
// export default {
//   swaggerUi,
//   specs,
// };
