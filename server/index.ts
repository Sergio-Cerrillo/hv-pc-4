
import express from 'express';
import path from 'path';
import logger from 'morgan';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import db from './db.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();


const port: number = parseInt(process.env.PORT ?? '3000', 10); 
const app = express();

app.use(logger('dev')); 

//css
app.use(express.static(path.join(__dirname, '../../client'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

//run server
const server = createServer(app);
const io = new Server(server);


//force table
await db.run(`
    CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    )
`);

// function to obtain messages
async function obtainMessages(): Promise<{ id: number; content: string }[]> {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM messages', [], (err: Error | null, rows: { id: number; content: string }[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

//successful connection
io.on('connection', async (socket: Socket) => {
    console.log('Usuario conectado');

    try {
        const mensajes = await obtainMessages(); //check if there are messages
        mensajes.forEach(row => {
            socket.emit('chat message', row.content); 
        });
    } catch (error) { //check the error if we cant acces
        console.error('Error al obtener los mensajes: ', (error as Error).message);
    }
//successful disconnection
socket.on('disconnect', () => {
    console.log('Usuario desconectado');
});

socket.on('chat message', async (msg: string) => {
    let result: any; 

        try {
            result = await db.run(
                `INSERT INTO messages (content) VALUES (:msg)`,
                { ':msg': msg }
            );
            console.log('Dato introducido en la BD correctamente');
        } catch (error) {
            console.error('Error al insertar: ', (error as Error).message);
            return;
        }
        io.emit('chat message', msg);
    });

// button to clean chat
socket.on('vaciar tabla', async () => {
        try {
            await db.run('DELETE FROM messages');
                console.log('Mensajes eliminados correctamente');
            const mensajes = await obtainMessages();
                if (mensajes.length) {
                io.emit('chat message', mensajes);
                }
        } catch (error) {
            console.error('Error al vaciar la tabla: ', (error as Error).message);
        }
    });

if (!socket.recovered) { // recuperator
    try {
        const results = await db.all(
            'SELECT id, content FROM messages WHERE id > ?',
            [0]
            );
        if (Array.isArray(results)) {
            results.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString());
            });
        } 
    } catch (error) {
            console.error('Error al recuperar mensajes: ', (error as Error).message);
        }
    }
});



server.listen(port, () => {
    console.log(`CHAT USANDO EL PUERTO: ${port}`);
});
