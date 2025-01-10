const nodemailer = require("nodemailer")

const { APP_ADMIN, APP_PASSWORD } = require("./config")

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
        user: APP_ADMIN,
        pass: APP_PASSWORD,
    }
})

module.exports = { transporter }