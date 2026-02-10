import sqlite from "sqlite3";
import { open } from "sqlite";
import path from 'node:path'

export async function getDBConnection(){

    return await open({
        filename: path.join('Database.db'),
        driver: sqlite.Database
    })
}