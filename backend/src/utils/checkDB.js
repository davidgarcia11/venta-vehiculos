const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./src/database.sqlite');

db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, tables) => {
    if (err) {
        console.error("❌ Error al obtener las tablas:", err.message);
        return;
    }
    console.log("📌 Tablas en la base de datos:");
    console.table(tables);
    db.close();
});
