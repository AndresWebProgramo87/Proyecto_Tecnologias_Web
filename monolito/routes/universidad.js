const { Router } = require('express');

const  { 
    createUniversidad,
    getUniversidades,
    updateUniversidadPorId,
    deletUniversidadId
} = require('../controllers/universidad');

const router = Router();

//Obtiene todos

router.get('/', getUniversidades);

//Crear 

router.post('/', createUniversidad);

//Actualiza por id

router.put('/:id', updateUniversidadPorId); 

 // eliminar

router.delete('/:id', deletUniversidadId);


module.exports = router;