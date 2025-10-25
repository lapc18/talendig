import swaggerJSDoc from "swagger-jsdoc";

export const swagger = swaggerJSDoc({
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Fifth Class API',
            version: '2.0',
            description: 'The api of the 5th class with db',
        },
    },
    apis: ['./src/routes/*.ts'],

})

export default swagger;