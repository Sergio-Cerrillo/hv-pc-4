import { Server } from "socket.io";
import { Socket } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import db from "../db.js";
import next from "next";

dotenv.config();

const port = 3003;
const hostname = "localhost";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

//config socket.io w/ next.js
app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  //connection
  io.on("connection", async (socket: Socket) => {
    console.log("Usuario conectado");

    try {
      const mensajes = await obtainMessages();
      socket.emit(
        "initial messages",
        mensajes.map((row) => row.content)
      );
    } catch (error) {
      console.error(
        "Error al obtener los mensajes: ",
        (error as Error).message
      );
    }

    //disconnect
    socket.on("disconnect", () => {
      console.log("Usuario desconectado");
    });

    //bd
    await db.run(`
      CREATE TABLE IF NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
      )
    `);

    socket.on("chat message", async (msg: string) => {
      console.log("Mensaje recibido en el servidor: ", msg);
      let result: any;

      try {
        result = await db.run(`INSERT INTO messages (content) VALUES (:msg)`, {
          ":msg": msg,
        });
        console.log("Dato introducido en la BD correctamente");
      } catch (error) {
        console.error("Error al insertar: ", (error as Error).message);
        return;
      }
      io.emit("chat message", msg);
    });

    // button to clean chat
    socket.on("vaciar tabla", async () => {
      try {
        await db.run("DELETE FROM messages");
        console.log("Mensajes eliminados correctamente");
        const mensajes = await obtainMessages();
        if (mensajes.length) {
          io.emit("chat message", mensajes);
        }
      } catch (error) {
        console.error("Error al vaciar la tabla: ", (error as Error).message);
      }
    });

    if (!socket.recovered) {
      // recuperator
      try {
        const results = await db.all(
          "SELECT id, content FROM messages WHERE id > ?",
          [0]
        );
        if (Array.isArray(results)) {
          results.forEach((row) => {
            socket.emit("chat message", row.content, row.id.toString());
          });
        }
      } catch (error) {
        console.error(
          "Error al recuperar mensajes: ",
          (error as Error).message
        );
      }
    }
  });

  //obtain msg
  async function obtainMessages(): Promise<{ id: number; content: string }[]> {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM messages",
        [],
        (err: Error | null, rows: { id: number; content: string }[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`>Ready on http://${hostname}:${port}`);
    });
});
