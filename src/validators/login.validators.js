// Objetivo: Validar los datos que se envian desde el cliente para crear un usuario
const { check, validationResult } = require('express-validator');
const { httpError } = require('../utils/error');
// Validar los datos que se envian desde el cliente
const validadorLogin = [
    // validamos que el atributo user exista, no este vacio y que tenga un minimo de 5 caracteres
    check('user')
        .exists().withMessage("Favor debe ir el atributo user")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isLength({ min: 5 }).withMessage("El minimo de caracteres son 5"),
    check('password')
        .exists().withMessage("Favor debe ir el atributo password")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isLength({ min: 8, max: 16 }).withMessage("El minimo de caracteres son 8 y el maximo son 16"),
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
    validadorLogin
}