const bcryptjs = require('bcryptjs')
const { User } = require('../models/userModel')
const { generateTokenAndSetCookie } = require('../utils/generateTokenAndSetCookie')
const { sendVerificationEmail } = require('../email/sendVerificationEmail')
const { sendWelcomeEmail } = require('../email/sendWelcomeEmail')

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

const verifyEmail = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) res.status(400).json({
            success: false,
            message: "Invalid or expired verification code"
        })

        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendWelcomeEmail(user.email, user.name)

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid user name"
        })

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) return res.status(400).json({
            success: false,
            message: "Invalid password"
        })

        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.log("Login failed")
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!email) return res.status(400).json({
            success: false,
            message: "Invalid user"
        })

    } catch (error) {
        console.log("")
    }
}

module.exports = { signup, login, logout, verifyEmail, forgotPassword }