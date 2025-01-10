const bcryptjs = require('bcryptjs')
const { User } = require('../models/user.model')
const { generateTokenAndSetCookie } = require('../utils/generateTokenAndSetCookie.js')
const { sendVerificationEmail } = require('../mailtrap/emails.js')

const signup = async (req, res) => {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            throw new Error("All fields are required")
        }
        const userAlreadyExists = await User.findOne({ email })

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save()

        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
const login = async (req, res) => {
    res.send("Login Route")
}
const logout = async (req, res) => {
    res.send("Logout Route")
}

module.exports = { signup, login, logout }