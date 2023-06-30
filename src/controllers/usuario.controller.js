//  DECLARACION DE VARIABLES
const database = require('./../config/basedatos');
const { encriptar } = require('./../utils/password');
const { httpError } = require('./../utils/error')
const { matchedData } = require('express-validator');
//  METODO PARA OBTENER TODAS LOS USUARIOS
const obtenerTodo = async (req, res) => {
    //obtener el id de todos los usuarios
    try {
        const db = await database();
        const sql = `SELECT * FROM usuario`;
        const [rows] = await db.query(sql);

        const resultado = {
            ok: true,
            data: rows
        }
        res.json(resultado);
    } catch (error) {
        return httpError(res, "Ocurrio algo en Get Usuarios");
    }
}
//  METODO PARA OBTENER UNA USUARIO
const obtenerUnoSolo = async (req, res) => {
    //obtener el id por un usuario
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `SELECT * FROM usuario WHERE id_user = ${id}`;
        const [row] = await db.query(sql);

        const resultado = {
            ok: true,
            data: row
        }

        res.json(resultado);
    } catch (error) {
        return httpError(res, "Ocurrio algo en Get Usuario");
    }
}
//  METODO PARA AGREGAR UNA USUARIO
const agregarUsuario = async (req, res) => {
    try {
        const body = matchedData(req);
        const { nombre, apellido, password, user, activo } = body;

        const passwordhash = encriptar(password);

        const db = await database();
        const sql = `INSERT INTO usuario(nombre, apellido, user, password, activo)
                VALUES('${nombre}', '${apellido}', '${user}', '${passwordhash}', ${activo})`;
        const [result] = await db.query(sql);

        if (result.insertId) {
            return res.json({
                "msj": "Usuario Agregado Correctamente",
                "usuario": result
            });
        }

        res.json({
            "msj": "Usuario No Agregado",
            // "usuario": usuario
        });
    } catch (error) {
        return httpError(res, "Ocurrió algo equivocado en POST Usuario");
    }
}
//  METODO PARA EDITAR UN USUARIO
const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido } = req.body;

        const db = await database();
        const sql = `UPDATE usuario SET
                    nombre = '${nombre}',
                    apellido = '${apellido}'
                WHERE id_user = ${id}`;
        const [result] = await db.query(sql);
        res.json({
            "msj": "usuario modificado correctamente",
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en PUT de Usuario");
    }
}
//  METODO PARA ELIMINAR UNA USUARIO
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM usuario
                WHERE id_user = ${id}`;
        const [result] = await db.query(sql);

        if (result.affectedRows) {
            return res.json({
                "msj": "usuario eliminado correctamente"
            });
        }

        res.json({
            "msj": "usuario no eliminado"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en DELETE de Usuario");
    }

}
//  EXPORTO MIS METODOS
module.exports = {
    obtenerTodo,
    obtenerUnoSolo,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario
}