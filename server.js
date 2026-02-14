import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { seedTable } from "./seedTable.js"
import { getDBConnection } from "./dbConnection.js"

const app = express()
app.use(cors())
app.use(express.json())

const upload = multer()

app.use(express.static("Public"))

// Expose shared browser modules (importable from 
// both Admin and Public pages).
app.use("/shared", express.static("Shared"))

app.use("/admin", express.static("Admin"))
app.post('/admin/upload', upload.none(), seedTable)

// Returns latest blogs as a bare array so both 
// clients can render easily.
app.get("/blogs", async (req, res) => {
    const db = await getDBConnection()

    try {
        const blogs = await db.all(
            "SELECT id, heading, content FROM blogs ORDER BY id DESC LIMIT 5"
        )
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" })
    } finally {
        await db.close()
    }
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})