const { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } = require("./emailTemplates")
const { transporter, senderEmail } = require('./nodemailer.config')

const sendVerificationEmail = async (email, verificationToken) => {

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: senderEmail
        },
        to: [email],
        subject: "Hello ✔",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    }

    const sendEmail = async (transporter, mailOptions) => {
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log("Verification email sent successfully", response)
        } catch (error) {
            console.log(`Error sending verification: ${error}`)
            throw new Error(`Error sending verification email: ${error}`)
        }
    }

    sendEmail(transporter, mailOptions)
}

const sendWelcomeEmail = async (email, name) => {

    const replacements = {
        "[Recipient's Name]": name,
        "[Company Name]": "User Authentication",
        "[Support Email]": senderEmail,
        "[Home Page]": "http://localhost:3000"
    }

    const strReplace = /\[(Recipient's Name|Company Name|Support Email|Home Page)\]/g

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: senderEmail
        },
        to: [email],
        subject: "Hello ✔",
        html: WELCOME_EMAIL_TEMPLATE.replace(strReplace, match => replacements[match])
    }

    const sendEmail = async (transporter, mailOptions) => {
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log("Welcome email sent successfully", response)
        } catch (error) {
            console.log(`Error sending welcome email: ${error}`)
            throw new Error(`Error sending welcome email: ${error}`)
        }
    }

    sendEmail(transporter, mailOptions)
}

module.exports = { sendVerificationEmail, sendWelcomeEmail }