import { getDBConnection } from "./db.js";

const db = await getDBConnection();
async function createTable() {
    await db.exec(`
                CREATE TABLE IF NOT EXISTS blogs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                heading TEXT NOT NULL,
                content TEXT NOT NULL
                )
                `)
    await db.close()
    console.log("Table created successfully")
}

createTable();
