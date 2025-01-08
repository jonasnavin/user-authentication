import express from "express"
import { connectDB } from "./db/connectDB.js"
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running in the port ${PORT}`)
})