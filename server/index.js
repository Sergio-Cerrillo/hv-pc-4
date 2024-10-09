import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import dotenv from 'dotenv';
import db from './db.js';

dotenv.config();

const port = process.env.PORT ?? 3001;
const app = express();
const server = createServer(app);
const io = new Server(server);

await db.run(`
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    )
`);

//FUNCION PARA OBTENER MESAJES
    async function obtenerMensajes(){
        return new Promise((resolve,reject)=>{
            db.all('SELECT * FROM messages',[],(err,rows)=>{
                if(err){
                reject(err);
                    
                }
                resolve(rows)
                
            })
        })
    }

io.on('connection', async (socket) => {
    console.log('usuario conectado');

    try{
        const mensajes = await obtenerMensajes(); //obtener los mensajes de la bd
        mensajes.forEach(row=>{
            socket.emit('chat message', row.content); //emitir cada uno
        })
    }catch(error){
        console.error('Error al obtener los mensajes: ', error.message)
    }

    socket.on('disconnect', () => {
        console.log('usuario desconectado');
    });

    socket.on('chat message', async (msg) => {
        let result
        
        try {
            result=await db.run(
                `INSERT INTO messages (content) VALUES (:msg)`,
                { ':msg': msg }
            );
            console.log('Dato introducido en la BD correctamente');
        } catch (error) {
            console.error('Error al insertar: ', error.message);
            return;
        }
        io.emit('chat message', msg);
    });

    //BOTON BORRAR PARA EL VACIO DE CHAT
    socket.on('vaciar tabla', async()=>{
        try{
            await db.run('DELETE FROM messages');
            console.log('Mensajes eliminados correctamente')
            const mensajes=await obtenerMensajes()
            mensajes.length && io.emit('chat message',mensajes)
        }catch{
            console.error('Error al vaciar la tabla')
        }
       
    })


    if (!socket.recovered) { // RECUPERADORS
        try {
            const results = await db.run(
                'SELECT id, content FROM messages WHERE id > ?',
            );
            if(Array.isArray(results)){
            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString());
            });
        }else{
            console.error('Accediendo a archivo: ',results)
        }
        } catch (e) {
            console.error(e);
        }
    }
});

app.use(logger('dev')); // info del log

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
