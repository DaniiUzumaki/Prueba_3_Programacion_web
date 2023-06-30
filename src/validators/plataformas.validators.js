// Objetivo: Validar los datos que se envian desde el usuario para crear un usuario
const { check, validationResult } = require('express-validator');
const { httpError } = require('../utils/error');
// Validar los datos que se envian desde el cliente para crear un usuario
const validadorPlataformas = [
    check('nombre')
        .exists().withMessage("Favor debe ir el atributo nombre para la plataforma")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            return httpError(res, error.array());
        }
    }
];
// Exportamos la funcion
module.exports = {
    validadorPlataformas
}