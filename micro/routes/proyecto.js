const { Router } = require('express');
const  { 
    createProyecto,
    getProyectos,
    updateProyectoPorId,
    deleteProyectoId
} = require('../controllers/proyecto');

const router = Router();


//Obtiene todos 

router.get('/', getProyectos);

//Crear 

router.post('/', createProyecto);


//Actualiza  por id

router.put('/:id', updateProyectoPorId);

 // eliminar

router.delete('/:id', deleteProyectoId);


module.exports = router;