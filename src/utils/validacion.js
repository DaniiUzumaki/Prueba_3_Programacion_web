// Objetivo: Validar los datos de entrada de las peticiones
const { validationResult } = require('express-validator');
const { httpError } = require('./error');
// Validar los datos de entrada de las peticiones
const validadorResultado = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        return httpError(res, error.array());
    }
}
// Exportamos la funcion
module.exports = {
    validadorResultado
}