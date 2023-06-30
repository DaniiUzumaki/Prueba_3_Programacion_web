// Obtenemos el metodo Router de express
const { Router } = require('express');
//CONTROLADORES
const { agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerTodo,
    obtenerUnoSolo } = require('./../controllers/usuario.controller');
const { TokenTrue } = require('./../middlewares/auth');
const { validadorUsuario } = require('./../validators/usuario.validators');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const router = Router();
//  METODOS DE NUESTRA RUTA
router.get('/', TokenTrue, obtenerTodo);
router.get('/:id', TokenTrue, obtenerUnoSolo);
router.post('/', [validadorUsuario], agregarUsuario);
router.put('/:id', TokenTrue, editarUsuario);
router.delete('/:id', TokenTrue, eliminarUsuario);
//  EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = router;