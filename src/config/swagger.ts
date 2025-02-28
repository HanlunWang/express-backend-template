import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from '../utils/logger';

/**
 * Swagger configuration options
 */
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Backend API',
      version: '1.0.0',
      description:
        'Express backend template with authentication, API documentation, and deployment configurations',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: '/api',
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

/**
 * Setup Swagger documentation for the Express app
 * @param app Express application
 */
export const setupSwagger = (app: Express): void => {
  try {
    const specs = swaggerJsdoc(options);

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Express Backend API Documentation',
      })
    );

    logger.info('Swagger documentation initialized at /api-docs');
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error setting up Swagger: ${error.message}`);
    } else {
      logger.error('Unknown error setting up Swagger');
    }
  }
};
