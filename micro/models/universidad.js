const { Schema, model } = require('mongoose');

const UniversidadSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El campo Nombre es obligatorio'],
        minlength: 1
    },
    direccion: {
        type: String,
        required: [true,'El campo Direccion es obligatorio'],
        minlength: 5
    },
    telefono: {
        type:String,
        required: [true,'El campo Telefono es obligatorio'],
        minlength: 5
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
});

module.exports = model('Universidad', UniversidadSchema);