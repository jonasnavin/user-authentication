const nodemailer = require("nodemailer")
const dotenv = require('dotenv')

dotenv.config()

const senderEmail = process.env.USER
const password = process.env.PASSWORD

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
        user: senderEmail,
        pass: password,
    }
})

module.exports = { transporter, senderEmail }