const { request, response } = require('express');
const Universidad = require('../models/universidad');


//crear

const createUniversidad = async (req = request, res = response) => {
    try {
        const { nombre, direccion, telefono } = req.body;

        const universidadBD = await Universidad.findOne({ nombre, direccion, telefono });

        if(universidadBD){
            return res.status(400).json({msg: 'Ya existe el Universidad'});
        }
        const datos = {
            nombre,
            direccion, 
            telefono
        }

        const universidad = new Universidad(datos); 

        await universidad.save();

        return res.status(201).json(universidad);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

}

//Consultar todos 

const getUniversidades = async (req, res = response) => {
    try {
        const universidadesBD = await Universidad.find()
        return res.json(universidadesBD)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}


//Actualiza o editar por su ID

const updateUniversidadPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, direccion, telefono} = req.body
        const data = {
            nombre,
            direccion,
            telefono,
            fechaActualizacion: new Date()
        }
        const universidad = 
            await Universidad.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(universidad)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

// eliminar por id

const deletUniversidadId = async (req = request, res = response) => {
    const universidadId = req.params.id;

    try {
    const universidad = await Universidad.findByIdAndDelete(universidadId);

    if (!universidad) {
        return res.status(404).json({ mensaje: "Universidad no encontrada" });
    }

    return res.status(204).json(); 
    } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la Universidada" });
    }
};

module.exports = { 
    createUniversidad,
    getUniversidades,
    updateUniversidadPorId,
    deletUniversidadId
}