const { APP_ADMIN, CLIENT_URL } = require("../configs/config")
const { transporter } = require("../configs/nodemailerConfig")
const { WELCOME_EMAIL_TEMPLATE } = require("./emailTemplates")

const sendWelcomeEmail = async (email, name) => {

    const replacements = {
        "[Recipient's Name]": name,
        "[Company Name]": "User Authentication",
        "[Support Email]": APP_ADMIN,
        "[Home Page]": CLIENT_URL
    }

    const strReplace = /\[(Recipient's Name|Company Name|Support Email|Home Page)\]/g

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: APP_ADMIN
        },
        to: [email],
        subject: "Welcome Email",
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

module.exports = { sendWelcomeEmail }