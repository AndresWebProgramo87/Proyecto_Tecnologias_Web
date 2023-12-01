const { request, response } = require('express');
const Cliente = require('../models/cliente');



//crear

const createCliente = async (req = request, res = response) => {
    try {
        const { nombre, email } = req.body;

        const clienteBD = await Cliente.findOne({ nombre, email });

        if(clienteBD){
            return res.status(400).json({msg: 'Ya existe el Cliente'});
        }
        const datos = {
            nombre,
            email
        }

        const cliente = new Cliente(datos); 

        await cliente.save();

        return res.status(201).json(cliente);
    }catch(e) {
        return res.status(500).json({msj: e})
    }

}

//Consultar todos 

const getClientes = async (req, res = response) => {
    try {
        
        const clientesBD = await Cliente.find()

        return res.json(clientesBD)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

//Actualiza o editar por su ID

const updateClientePorId = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, email } = req.body
        const data = {
            nombre,
            email,
            fechaActualizacion: new Date()
        }
        const cliente = 
            await Cliente.findByIdAndUpdate(id, data, {new : true});
        res.status(201).json(cliente)
    }catch(e) {
        return res.status(500).json({msj: e})
    }
}

// Eliminar
const deletClienteId = async (req = request, res = response) => {
    const clienteId = req.params.id;

    try {
    const cliente = await Cliente.findByIdAndDelete(clienteId);

    if (!cliente) {
        return res.status(404).json({ mensaje: "Cliente no encontrada" });
    }

      return res.status(204).json(); //.
    } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar la Cliente" });
    }
};


module.exports = { 
    createCliente,
    getClientes,
    updateClientePorId,
    deletClienteId
}