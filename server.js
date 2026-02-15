import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { seedTable } from "./DB/seedTable.js"
import { getDBConnection } from "./DB/dbConnection.js"
import { deleteBlog } from "./DB/deleteBlog.js"

const app = express()
const upload = multer()

app.use(cors())
app.use(express.json())
app.use(express.static("Public"))
app.use("/shared", express.static("Shared"))
app.use("/admin", express.static("Admin"))
app.post('/admin/upload', upload.none(), seedTable)

// Fetch blogs as a bare array of objects: [{ id, heading, content }, ...]
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

// Delete a blog by id
app.delete("/blogs/:id", deleteBlog)

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})
