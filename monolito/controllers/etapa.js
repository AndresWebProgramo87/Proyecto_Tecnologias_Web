const { request, response } = require('express');
const Etapa = require('../models/etapa');


/**
 * crear
 */
const createEtapa = async (req = request, res = response) => {
    try {
        const { nombre } = req.body;

        const etapaBD = await Etapa.findOne({ nombre });

        if(etapaBD){
            return res.status(400).json({msg: 'Ya existe el Etapa'});
        }
        const datos = {
            nombre
        }

        const etapa = new Etapa(datos); 

        await etapa.save();

        return res.status(201).json(etapa);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

}

//Consultar todos 

const getEtapas = async (req, res = response) => {
    try {
        const etapasBD = await Etapa.find()
        return res.json(etapasBD)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

/**
 * Actualiza o editar por su ID
 */
const updateEtapaPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre } = req.body
        const data = {
            nombre,
            fechaActualizacion: new Date()
        }
        const etapa = 
            await Etapa.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(etapa)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

// Eliminar 
const deleteEtapaId = async (req = request, res = response) => {
    const etapaId = req.params.id;

    try {
    const etapa = await Etapa.findByIdAndDelete(etapaId);

    if (!etapa) {
        return res.status(404).json({ mensaje: "Etapa no encontrada" });
    }

      return res.status(204).json(); //.
    } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la Etapa" });
    }
};

module.exports = { 
    createEtapa,
    getEtapas,
    updateEtapaPorId,
    deleteEtapaId
}