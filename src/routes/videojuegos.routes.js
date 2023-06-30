// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { obtenerVideoJuegos,
    obtenerVideoJuego,
    obtenerVideoJuegoNombre,
    agregarVideoJuego,
    editarVideoJuego,
    eliminarVideoJuego } = require('../controllers/videojuegos.controllers');
//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenTrue } = require('../middlewares/auth');
const { validadorVideoJuegos } = require('../validators/videojuegos.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//RUTAS DE RECETAS
router.get('/', obtenerVideoJuegos);
router.post('/', [TokenTrue, validadorVideoJuegos], agregarVideoJuego);
router.get('/:id', obtenerVideoJuego);
router.get('/plataforma/:name', obtenerVideoJuegoNombre);
router.put('/:id',TokenTrue, editarVideoJuego);
router.delete('/:id',TokenTrue, eliminarVideoJuego);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;