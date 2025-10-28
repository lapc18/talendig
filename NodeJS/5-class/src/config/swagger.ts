import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Fifth Class API',
            version: '2.0',
            description: 'The API of the 5th class with database integration',
            contact: {
                name: 'Talendig Learning Program'
            }
        },
        tags: [
            {
                name: 'Products',
                description: 'Product management endpoints'
            },
            {
                name: 'Users',
                description: 'User management endpoints'
            }
        ],
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Firebase ID Token'
                }
            }
        }
    },
    apis: [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../../src/routes/*.ts')
    ],
};

export const swagger = swaggerJSDoc(swaggerOptions);

export default swagger;