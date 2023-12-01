const { Router } = require('express');

const  { 
    createEtapa,
    getEtapas,
    updateEtapaPorId,
    deleteEtapaId
} = require('../controllers/etapa');

const router = Router();


//Obtiene todos

router.get('/', getEtapas);

//Crear 

router.post('/', createEtapa);

//Actualiza por id

router.put('/:id', updateEtapaPorId);

 // eliminar

router.delete('/:id', deleteEtapaId);


module.exports = router;