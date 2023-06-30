// Obtenemos el metodo Router de express
const database = require('../config/basedatos');
const { httpError } = require('../utils/error');
const { obtenerData } = require('../middlewares/auth');
//CONTROLADORES
const obtenerPlataformas = async (req, res) => {
    try {
        const db = await database();
        //  METODO PARA OBTENER TODAS LAS PLATAFORMAS DE VIDEOJUEGOS
        const sql = `
            SELECT 
                p.id_plat,
                p.nombre        
            FROM plataforma p
        `;
        //EJECUTAMOS LA CONSULTA
        const [rows] = await db.query(sql);
        //RETORNAMOS LA RESPUESTA
        res.json(
            {
                "estado": true,
                data: rows
            }
        );
    } catch (error) {
        httpError(res, "ERROR_GET_PLATAFORMAS");
    }
}
//  METODO PARA AGREGAR UNA PLATAFORMA
const agregarPlataforma = async (req, res) => {

    try {
        const { nombre, estado } = req.body;
        const token = req.headers.authorization;
        const { usuario } = obtenerData(token.split(" ").pop());
        const id_usuario = usuario.id;
        const db = await database();

        const sql = `
            INSERT INTO plataforma(nombre, id_user)
            VALUES('${nombre}', ${id_usuario})
        `;
        // EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.insertId) {
            return res.json(
                {
                    "eatado": false,
                    "msj": "No se ha creado nada en la tabla Plataforma"
                }
            );
        }
        res.json(
            {
                "estado": true
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_POST_PLATAFORMA")
    }
}
//  METODO PARA OBTENER UNA PLATAFORMA
const obtenerPlataforma = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                p.id_plat,
                p.nombre        
            FROM plataforma
        WHERE c.id_cat = ${id}
    `;

        const [rows] = await db.query(sql);

        res.json(
            {
                "estado": true,
                data: rows
            }
        );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-PLATAFORMA")
    }
}
//  METODO PARA OBTENER UNA PLATAFORMA POR NOMBRE
const obtenerPlataformaNombre = async (req, res) => {
    try {
        const { name } = req.params;
        const db = await database();

        const sql = `
        SELECT 
                p.id_plat,
                p.nombre        
            FROM plataforma p
        WHERE p.nombre like '${name}%'

    `;
       //EJECUTAMOS LA CONSULTA 
       const [rows] = await db.query(sql);
       res.json(
           {
               "estado": true,
               data: rows
           }
       );
    } catch (error) {
        return httpError(res, "ERROR_GET_UN_SOLO_DATO-DE-LA-PLATAFORMA-POR-NOMBRE")
    }
}
// Metodos para editar
const editarPlataforma = async (req, res) => {

    try {
        const { id } = req.params;
        const { nombre, estado} = req.body;
        const db = await database();
        const sql = `
            UPDATE plataforma SET
                nombre = '${nombre}'
            WHERE id_plat = ${id}
        `;
        //EJECUTAMOS LA CONSULTA
        const [resultado] = await db.query(sql);
        if (!resultado.affectedRows) {
            return httpError(res, "Error al Editar la Plataforma");
        }
        //RETORNAMOS LA RESPUESTA
        return res.json({
            "estado": true,
            "msj": "Se editó correctamente la Plataforma"
        });
    } catch (error) {
        return httpError(res, "Ocurrio algo en el PUT Plataforma");
    }
}
// Metodos para eliminar
const eliminarPlataforma = async (req, res) => {
    try {
        const { id } = req.params;

        const db = await database();
        const sql = `DELETE FROM plataforma WHERE id_plat = ${id}`;
        const [resultado] = await db.query(sql);

        if (!resultado.affectedRows) {
            return httpError(res, "No se pudo eliminar nada de la Plataforma");
        }

        return res.json(
            {
                "estado": true,
                "msj": "Plataforma fue eliminada correctamente"
            }
        )

    } catch (error) {
        return httpError(res, "ERROR EN DELETE PLATAFORMA");
    }
}
//EXPORTA NUESTRA RUTA PARA NUESTRO INDEX.JS
module.exports = {  
    obtenerPlataformas,
    obtenerPlataforma,
    obtenerPlataformaNombre,
    agregarPlataforma,
    editarPlataforma,
    eliminarPlataforma           
}