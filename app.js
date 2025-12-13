import express from "express"
import api from "./route/api.js"
import cors from "cors"
import { database } from "./config/database.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", api)

app.get("/", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})

app.listen(3000, () => {
    database()
    console.log('Aplikasi berjalan di http://localhost:3000')
})