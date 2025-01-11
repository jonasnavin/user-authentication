const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates")
const { transporter } = require('../configs/nodemailerConfig')
const { APP_ADMIN } = require("../configs/config")

const sendVerificationEmail = async (email, verificationToken) => {

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: APP_ADMIN
        },
        to: [email],
        subject: "Verification Email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    }

    const sendEmail = async (transporter, mailOptions) => {
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log("Verification email sent successfully", response)
        } catch (error) {
            console.log(`Error sending verification email: ${error}`)
            throw new Error(`Error sending verification email: ${error}`)
        }
    }

    sendEmail(transporter, mailOptions)
}


module.exports = { sendVerificationEmail }