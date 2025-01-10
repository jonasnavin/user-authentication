const express = require("express")
const { connectDB } = require("./db/connectDB")
const authRoutes = require("./routes/auth.route")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running in the port ${PORT}`)
})