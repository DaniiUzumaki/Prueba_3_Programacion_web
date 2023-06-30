// Objetivo: Crear y verificar token
const jwt = require('jsonwebtoken');

// Creamos el token
const crearToken = ( usuario ) => {
    const token = jwt.sign(
        { usuario },
        process.env.SECRETO);

    return token;
}
// Verificamos el token
const verificarToken = ( token ) => {
    try {
        const existo = jwt.verify(token, process.env.SECRETO);
        return existo;
    } catch (error) {
        return false;
    }
}
// Exportamos los metodos
module.exports = {
    crearToken,
    verificarToken
}