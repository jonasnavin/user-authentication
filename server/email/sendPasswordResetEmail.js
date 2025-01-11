const { APP_ADMIN } = require("../configs/config")
const { transporter } = require("../configs/nodemailerConfig")
const { PASSWORD_RESET_REQUEST_TEMPLATE } = require("./emailTemplates")

const sendPasswordResetEmail = async (email, resetUrl) => {

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: APP_ADMIN
        },
        to: [email],
        subject: "Password reset link",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl)
    }

    const sendEmail = async (transporter, mailOptions) => {
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log("Password reset email sent successfully", response)
        } catch (error) {
            console.log(`Error sending password reset email: ${error}`)
            throw new Error(`Error sending password reset email: ${error}`)
        }
    }

    sendEmail(transporter, mailOptions)
}

module.exports = { sendPasswordResetEmail }