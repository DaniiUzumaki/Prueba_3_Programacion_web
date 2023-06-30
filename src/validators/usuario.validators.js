// Objetivo: Validar los datos que se envian desde el cliente para crear un usuario
const { check, validationResult } = require('express-validator');
const { httpError } = require('./../utils/error');
// Validar los datos que se envian desde el cliente para crear un usuario
const validadorUsuario = [
    check('nombre')
        .exists().withMessage("Favor debe ir el atributo nombre")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('apellido')
        .exists().withMessage("Favor debe ir el atributo apellido")
        .notEmpty().withMessage("Favor este campo debe venir con informacion"),
    check('user')
        .exists().withMessage("Favor debe ir el atributo user")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isLength({ min: 5 }).withMessage("El minimo de caracteres son 5"),
    check('password')
        .exists().withMessage("Favor debe ir el atributo password")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isLength({ min: 8, max: 16 }).withMessage("El minimo de caracteres son 8 y el maximo son 16"),
    check('activo')
        .exists().withMessage("Favor debe ir el atributo activo")
        .notEmpty().withMessage("Favor este campo debe venir con informacion")
        .isInt({ min: 0, max: 1 }).withMessage("Favor colocar 1 si es verdadero o 0 si es falso"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            next();
        } catch (error) {
            return httpError(res, error.array());
        }
    }
];

module.exports = {
    validadorUsuario
}