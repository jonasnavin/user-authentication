const express = require("express")

const { connectDB } = require("./db/connectDB")
const authRoutes = require("./routes/authRoutes")
const { PORT } = require("./configs/config")

const app = express()

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running in the port ${PORT}`)
})