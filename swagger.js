const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'A contacts API documentation'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // archivo principal donde definís tus rutas

swaggerAutogen(outputFile, endpointsFiles, doc)
