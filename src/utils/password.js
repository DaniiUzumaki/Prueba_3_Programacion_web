// Objetivo: encriptar y desencriptar contraseñas
const bcrypt = require('bcrypt');
//  Encriptar contraseña
const encriptar = ( password ) => {
    const salt = 10;
    const encriptado = bcrypt.hashSync(password, salt);
    return encriptado;
}
// Desencriptar contraseña
const desencriptar = ( password, passwordHash) => {
    const existo = bcrypt.compareSync(password, passwordHash);
    return existo;
}
// Exportamos los metodos
module.exports = {
    encriptar,
    desencriptar
}