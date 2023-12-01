
const { request, response } = require('express');
const TipoProyecto = require('../models/tipoProyecto');


//crear

const createTipoProyecto = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const tipoProyectoBD = await TipoProyecto.findOne({ nombre });

        if(tipoProyectoBD){// ya existe
            return res.status(400).json({msg: 'Ya existe tipo TipoProyecto'});
        }
        const datos = {
            nombre
        }

        const tipoProyecto = new TipoProyecto(datos); 

        await tipoProyecto.save();

        return res.status(201).json(tipoProyecto);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

}

//Consultar todos 

const getTiposProyectos = async (req, res = response) => {
    try {
        const tiposProyectosBD = await TipoProyecto.find()
        return res.json(tiposProyectosBD)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}


  //Consultar por Id

const getTipoProyectoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const query = {_id: id}
        const tipoProyectoBD = await TipoProyecto.findOne(query)
        return res.json(tipoProyectoBD)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}


 // Actualiza o editar por su ID

const updateTipoProyectoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre } = req.body
        const data = {
            nombre,
            fechaActualizacion: new Date()
        }
        const tipoProyecto = 
            await TipoProyecto.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(tipoProyecto)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

// eliminar por id

const deleteTipoProyectoId = async (req = request, res = response) => {
const tipoProyectoId = req.params.id;

try {
    const tipoProyecto = await TipoProyecto.findByIdAndDelete(tipoProyectoId);

    if (!tipoProyecto) {
    return res.status(404).json({ msj: "TipoProyecto no encontrado" });
    }

    return res.status(204).json(); 
} catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al borrar el TipoProyecto" });
}
};


module.exports = { 
    createTipoProyecto,
    getTiposProyectos,
    getTipoProyectoPorId,
    updateTipoProyectoPorId,
    deleteTipoProyectoId
}