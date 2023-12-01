const { request, response } = require('express');
const Proyecto = require('../models/proyecto');
const TipoProyecto = require('../models/tipoProyecto');
const Cliente = require('../models/cliente');
const Etapa = require('../models/etapa');
const Universidad = require('../models/universidad');


//crea

const createProyecto = async (req = request, res = response) => {
    try{
        const data = req.body
        const { cliente, tipoProyecto, etapa, universidad } = data

        const universidadBD = await Universidad.findOne({
            _id: universidad._id
        })
        if(!universidadBD){
            return res.status(400).json({
                msj: 'No existe tipo Proyecto'
            })
        }

        const etapaBD = await Etapa.findOne({
            _id: etapa._id
        })
        if(!etapaBD){
            return res.status(400).json({
                msj: 'No existe tipo Proyecto'
            })
        }

        const tipoProyectoBD = await TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if(!tipoProyectoBD){
            return res.status(400).json({
                msj: 'No existe tipo Proyecto'
            })
        }
        const clienteBD = await Cliente.findOne({
            _id: cliente._id
        })
        if(!clienteBD){
            return res.status(400).json({
                msj: 'No existe Proyecto'
            })
        }
        const proyecto = new Proyecto(data);
        await proyecto.save();
        return res.status(201).json(proyecto);
    }catch(e){
        return res.status(500).json({
            error: e
        });
    }
}


//Consultar todos

const getProyectos = async (req, res = response) => {
    try{
        const proyectosBD = await Proyecto.find()
        .populate({
            path: 'cliente'
        })
        .populate({
            path: 'tipoProyecto'
        })
        .populate({
            path: 'etapa'
        })
        .populate({
            path: 'universidad'
        })
        return res.json(proyectosBD);
    }catch(e){
        return res.status(500).json({
            error: e
        })
    }
}


//Actualiza o editar por su ID


const updateProyectoPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { numero, titulo, fechaInicio, fechaEntrega, valor, fechaCreacion, tipoProyecto, cliente, etapa, universidad } = req.body
        const data = {
            numero,
            titulo,
            fechaInicio,
            fechaEntrega,
            valor,
            fechaCreacion,
            tipoProyecto,
            cliente,
            etapa,
            universidad,
            fechaActualizacion: new Date()
        }
        const proyecto = 
            await Proyecto.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(proyecto)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

// Eliminar 
const deleteProyectoId = async (req = request, res = response) => {
    const proyectoId = req.params.id;

    try {
    const proyecto = await Proyecto.findByIdAndDelete(proyectoId);

    if (!proyecto) {
        return res.status(404).json({ mensaje: "Proyecto no encontrada" });
    }

      return res.status(204).json(); //.
    } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la Proyecto" });
    }
};


module.exports = { 
    createProyecto,
    getProyectos,
    updateProyectoPorId,
    deleteProyectoId
}