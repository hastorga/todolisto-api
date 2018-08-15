'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
var auth = require("./api/helpers/auth");

//Modelos
require("./api/models/tarea.js");

module.exports = app; // for testing

// Conexión servidor de pruebas
var username = 'todo';
var password = encodeURIComponent('#listo');
var database = 'todolisto';
var port = '27017';
var host = 'localhost';
mongoose.connect(`mongodb://${host}:${port}/${database}`, (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');
});

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: auth.verifyToken
  }
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  mongoose.Promise = global.Promise;
 // mongoose.connect(`mongodb://${host}:${port}/${database}`);
  var port = process.env.PORT || 10010;

  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/users?name=Scott');
  }
});
