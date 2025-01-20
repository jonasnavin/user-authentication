const express = require("express")
const cookieParser = require('cookie-parser')
const cors = require('cors')

const { connectDB } = require("./db/connectDB")
const authRoutes = require("./routes/authRoutes")
const { PORT, NODE_ENV } = require("./configs/config")
const { corsOperation } = require("./middlewares/corsOperation")

const app = express()

app.use(cors(corsOperation))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

console.log(NODE_ENV)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running in the port ${PORT}`)
})