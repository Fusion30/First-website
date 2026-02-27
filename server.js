import cors from 'cors'
import express from 'express'
import multer from 'multer'
import { seedTable } from "./DB/seedTable.js"
import { getDBConnection } from "./DB/dbConnection.js"
import { deleteBlog } from "./DB/deleteBlog.js"

const app = express()
const upload = multer()

app.set('view engine', 'ejs')
app.set('views', 'Public/views')

app.use(cors())
app.use(express.json())
app.post('/admin/upload', upload.none(), seedTable)

// Render homepage with blog previews
app.get('/', async (req, res) => {
    const db = await getDBConnection()
    try {
        const blogs = await db.all(
            "SELECT id, heading, content FROM blogs ORDER BY id DESC LIMIT 5"
        )
        const baseUrl = req.protocol + '://' + req.get('host')
        res.render('index', { blogs, baseUrl })
    } catch (error) {
        res.status(500).send("Error fetching blogs")
    } finally {
        await db.close()
    }
})

//====== Render full blog post page ======
app.get('/blog/:id', async (req, res) => {
    const blogId = Number.parseInt(req.params.id, 10)
    if (!Number.isFinite(blogId)) {
        return res.status(400).send("Invalid blog ID")
    }

    const db = await getDBConnection()
    try {
        const blog = await db.get(
            "SELECT id, heading, content FROM blogs WHERE id = ?",
            [blogId]
        )
        if (!blog) {
            return res.status(404).send("Blog not found")
        }
        const baseUrl = req.protocol + '://' + req.get('host')
        // create a short meta description from content
        const metaDescription = (blog.content || '').replace(/\s+/g, ' ').trim().substring(0, 160)
        const fullUrl = baseUrl + req.originalUrl
        res.render('blog-post', { blog, metaDescription, baseUrl, fullUrl })
    } catch (error) {
        res.status(500).send("Error fetching blog")
    } finally {
        await db.close()
    }
})

// Fetch blogs as a bare array of objects: [{ id, heading, content }, ...]
app.get("/blogs", async (req, res) => {
    const db = await getDBConnection()
    try {
        const blogs = await db.all(
            "SELECT id, heading, content FROM blogs ORDER BY id DESC LIMIT 5"
        )
        res.status(200).json(blogs)//returns { id, heading, content }
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs" })
    } finally {
        await db.close()
    }
})

// Delete a blog by id
app.delete("/blogs/:id", deleteBlog)

// Serve static files (after routes so they don't intercept)
app.use(express.static("Public"))
app.use("/shared", express.static("Shared"))
app.use("/admin", express.static("Admin"))

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})
