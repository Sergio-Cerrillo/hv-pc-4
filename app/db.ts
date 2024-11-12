import sqlite3 from "sqlite3";
sqlite3.verbose();

//open database
const db = new sqlite3.Database("./db_messages.db", (err) => {
  if (err) {
    console.error("Error al abrir la BD: ");
  } else {
    console.log("Conectado a la BD");
  }
});

export default db;
