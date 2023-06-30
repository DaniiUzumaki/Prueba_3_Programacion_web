// Importamos la promesa
const mysql = require('mysql2/promise')
// Configuracion de la base de datos
const configDatabase = {
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
}
// configDatabase 
const connection = async () => {
    console.log('conexion establecida correctamente');
    return await mysql.createConnection(configDatabase)
}
// Exportamos la funcion para la bd
module.exports = connection