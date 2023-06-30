// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerPlataformas,
    obtenerPlataforma,
    obtenerPlataformaNombre,
    agregarPlataforma,
    editarPlataforma,
    eliminarPlataforma } = require('../controllers/plataformas.controllers');

//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenTrue } = require('../middlewares/auth');
const { validadorPlataformas } = require('../validators/plataformas.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE CATEGORIAS
router.get('/', obtenerPlataformas);
router.post('/', [TokenTrue, validadorPlataformas], agregarPlataforma);
router.get('/nombre/:name', obtenerPlataformaNombre);
router.get('/:id', obtenerPlataforma);
router.put('/:id',TokenTrue, editarPlataforma);
router.delete('/:id',TokenTrue, eliminarPlataforma);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;