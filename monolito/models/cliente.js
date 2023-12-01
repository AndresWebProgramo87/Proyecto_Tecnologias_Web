const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El campo Nombre es obligatorio'],
        minlength: 1
    },
    email: {
        type: String,
        required: [true,'El campo Email es obligatorio'],
        unique: [true, 'El campo Email debe ser ínico']
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

module.exports = model('Cliente', ClienteSchema);