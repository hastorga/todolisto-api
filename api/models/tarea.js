'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TareaSchema = new Schema({
  titulo: {
    type: String
  },
  descripcion: {
    type: String,
    index: true
  },
  fecha_inicio: {
    type: Date,
    default: Date.now
  },
  fecha_termino: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: Number,
  },
  nombre_estado: {
    type: [{
      type: String,
      enum: ['Creada', 'En Proceso', 'Terminada']
    }],
    default: ['Creada']
  }
});

module.exports = mongoose.model('Tarea', TareaSchema);
