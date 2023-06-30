// Objetivo: Controlador para el login de la aplicacion
const database = require('./../config/basedatos');
const jwt = require('./../utils/jsonwebtoken');
const { desencriptar } = require('./../utils/password');

//GENERAR LA FUNCION PARA VALIDAR EL LOGIN, DONDE REQUIERE PARAMETROS REQ(REQUEST) Y RES(RESPONSE)
//REQ => LO QUE RECIBO AL SERVIDOR
//RES => LO QUE ENVIO AL USUARIO
const login = async (req, res) => {
    //AGREGAMOS TRY-CATCH PARA QUE NUESTRA API NO SE CAIGA BRUSCAMENTE
    try {
        //DECONTRUIR EL OBJETO BODY OBTENIENDO SOLO LOS CAMPOS A USAR
        const { user, password } = req.body;
        //INSTACIA DE NUESTRA BASE DE DATOS
        const db = await database();
        //GENERAMOS QUERY A EJECUTAR DE LA TABLA RESPECTIVA
        const sql = `SELECT * 
                    FROM usuario 
                    WHERE user = '${user}'`;
        /**
         * DECONTRUIMOS NUESTRO ARREGLO DE RESULTADO DE LA QUERY
         * DONDE EL NOMBRE QUE LE DEMOS A CADA UNO DE ELLOS ES A GUSTO
         * RESPETANDO EL ORDEN QUE TENGA ESTE ARREGLO
         */
        const [row, ASDA] = await db.query(sql);

        //VERIFICAR SI LAS FILAS TRAEN INFORMACION, RECORDAR QUE LA VARIABLE ES UN ARREGLO
        if (!row.length) {
            return res.json({
                "estado": false,
                "msj": "El usuario no existe en la base de datos videojuegos"
            });
        }
        //COMPRUEBO SI LA CONTRASEÑA QUE INGRESE POR JSON ES LA MISMA QUE EN LA BASE
        const existo = desencriptar(password, row[0].password);

        //VALIDO QUE ESTO SEA VERDADERO
        if (!existo) {
            return res.json({
                "estado": false,
                "msj": "contraseña incorrecta o usuario inactivo"
            });
        }

        //GENERO UN OBJETO CON LA INFORMACION QUE LE MANDEMOS AL PAYLOAD DEL TOKEN
        const usuario = {
            id: row[0].id_user,
            nombre: row[0].nombre,
            apellido: row[0].apellido,
            activo: row[0].activo
        };
        //GENERAMOS NUESTRO TOKEN
        const token = jwt.crearToken(usuario);
        //RESPONEMOS AL CLIENTE CON EL TOKEN
        res.json({
            "estado": true,
            token
        });
    } catch (error) {
        //EN CASO DE HABER ERROR EN EL TRY, MANDAMOS QUE OCURRIO ALGO
        return httpError(res, "Ocurrio un problema en el Login de usuario");
    }
}
//  METODO PARA VERIFICAR SI EL TOKEN ES VALIDO
const verificar = async (req, res) => {
    try {
        res.json({
            ok: true
        });
    } catch (error) {
        return httpError(res, "Ocurrió algo al verificar la identidad del token");
    }

}
//EXPORTAMOS NUESTROS METODOS
module.exports = {
    login,
    verificar
}