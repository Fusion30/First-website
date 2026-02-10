import cors from 'cors'
import express from 'express'
import { seedTable} from "seedTable.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static("Public"))

app.use("/admin", express.static("Admin"))
app.use('/admin/upload',seedTable() )

app.get("/blogs", (req, res) => { })

app.listen(3000, () => { 
    console.log("Server is listening on port 3000")
})