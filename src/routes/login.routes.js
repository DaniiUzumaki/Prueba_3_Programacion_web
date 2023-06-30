// Obtenemos el metodo Router de express
const { Router } = require('express'); // REQUERIMOS EL MODULO DE RUTAS DE EXPRESS
//CONTROLADORES
const { login, verificar } = require('./../controllers/login.controller');
const { validadorLogin } = require('./../validators/login.validators'); 
//LLAMAMOS NUESTRO METODO DE VERIFICAR TOKEN.
const { TokenTrue } = require('./../middlewares/auth');
//INSTACIA DE NUESTRA ROUTER DE EXPRESS
const route = Router();
//verifica si existe usario y crea token
route.post('/login', [validadorLogin], login);
//verifica si el token es valido
route.post('/verificar', TokenTrue, verificar);
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = route;