const { Router } = require('express');

const  { 
    createTipoProyecto,
    getTiposProyectos,
    getTipoProyectoPorId,
    updateTipoProyectoPorId,
    deleteTipoProyectoId
} = require('../controllers/tipoProyecto');

const router = Router();

//Obtiene todos

router.get('/', getTiposProyectos);

//Obtiene  por id

router.get('/:id', getTipoProyectoPorId);

//Crear 

router.post('/', createTipoProyecto);

//Actualiza por id

router.put('/:id', updateTipoProyectoPorId);

 // eliminar

router.delete('/:id', deleteTipoProyectoId);

module.exports = router;