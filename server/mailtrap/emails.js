const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates")
const { client, sender } = require("./mailtrap.config.js")

const sendVerificationEmail = async (email, verificationToken) => {
    const recipients = [{ email }]
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
            category: "Email Verification",
        })

        console.log("Email sent successfully", response)
    } catch (error) {
        console.log(`Error sending verification: ${error}`)
        throw new Error(`Error sending verification email: ${error}`)
    }
}

module.exports = { sendVerificationEmail }