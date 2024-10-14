import sqlite3 from 'sqlite3';
sqlite3.verbose();

//abrimos la base
const db = new sqlite3.Database('./db_messages.db', (err) =>{
    if (err) {
        console.error('Error al abrir la BD: ')
    }else {
        console.log('Conectado a la BD');
    }
})

//exportamos la conexion
export default db;