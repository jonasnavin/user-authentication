const nodemailer = require("nodemailer")
const dotenv = require('dotenv')

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
})

const mailOptions = {
    from: {
        name: "Pikachu",
        address: process.env.USER
    },
    to: ["jonasnavin@gmail.com"],
    subject: "Hello ✔",
    text: "Hello world!",
    html: "<b>Hello world?</b>"
}

const sendEmail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error)
    }
}

sendEmail(transporter, mailOptions)