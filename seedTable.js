import { getDBConnection } from "./dbConnection.js";

export async function seedTable(req, res) {
    const db = await getDBConnection()
    const { heading, content } = req.body

    try {
        await db.exec(' BEGIN TRANSACTION ')
        await db.run(
            `
                        INSERT INTO blogs (heading, content) VALUES  (?,?)
                        `,
            [heading, content]
        )

        await db.exec(' COMMIT ')
        res.status(200).json({ message: "Blog added to DB successfully" })
    } catch (error) {
        await db.exec(' ROLLBACK ')
        res.status(500).json({ message: "Error adding blog to DB" })
    } finally {
        await db.close()
    }
}