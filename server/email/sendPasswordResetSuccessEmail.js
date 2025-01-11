const { APP_ADMIN } = require("../configs/config")
const { transporter } = require("../configs/nodemailerConfig")
const { PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates")

const sendPasswordResetSuccessEmail = async (email) => {

    const mailOptions = {
        from: {
            name: "Pikachu",
            address: APP_ADMIN
        },
        to: [email],
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    }
    const sendEmail = async (transporter, mailOptions) => {
        try {
            const response = await transporter.sendMail(mailOptions)
            console.log("Password Reset Successful", response)
        } catch (error) {
            console.log(`Error sending password reset success email: ${error}`)
            throw new Error(`Error sending password reset success email: ${error}`)
        }
    }
    sendEmail(transporter, mailOptions)
}

module.exports = { sendPasswordResetSuccessEmail }