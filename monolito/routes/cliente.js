const { Router } = require('express');

const  { 
    createCliente,
    getClientes,
    updateClientePorId,
    deletClienteId
} = require('../controllers/cliente');

const router = Router();


//Obtiene todos

router.get('/', getClientes);


//Crear 

router.post('/', createCliente);

//Actualiza por id

router.put('/:id', updateClientePorId);

// eliminar

router.delete('/:id', deletClienteId);


module.exports = router;