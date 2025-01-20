const mongoose = require('mongoose')
const { MONGO_URI } = require('../configs/config')

const connectDB = async () => {
    try {
        console.log(MONGO_URI)
        const conn = await mongoose.connect(MONGO_URI)
        console.log("MongoDB Connected: ", conn.connection.host)
    }
    catch (err) {
        console.log("Error connection to MongoDB: ", err.message)
        process.exit(1)
    }
}

module.exports = { connectDB }