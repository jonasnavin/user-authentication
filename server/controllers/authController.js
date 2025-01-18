const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const { User } = require('../models/userModel')
const { generateTokenAndSetCookie } = require('../utils/generateTokenAndSetCookie')
const { sendVerificationEmail } = require('../email/sendVerificationEmail')
const { sendWelcomeEmail } = require('../email/sendWelcomeEmail')
const { sendPasswordResetEmail } = require('../email/sendPasswordResetEmail')
const { CLIENT_URL } = require('../configs/config')
const { sendPasswordResetSuccessEmail } = require('../email/sendPasswordResetSuccessEmail')

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
        console.log("Sign up failed", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const verifyEmail = async (req, res) => {
    const { code } = req.body
    console.log(code)
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!user) return res.status(400).json({
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
        console.log("Email verification failed", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({
            success: false,
            message: "User not found"
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
        console.log("Login failed", error)
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
        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid user"
        })

        const resetToken = crypto.randomBytes(20).toString('hex')
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()

        await sendPasswordResetEmail(user.email, `${CLIENT_URL}/reset-password/${resetToken}`)

        res.status(200).json({
            success: true,
            message: "Password reset link sent successfully"
        })

    } catch (error) {
        console.log("Forget password operation failed", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid or expired reset token"
        })

        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        await sendPasswordResetSuccessEmail(user.email)

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    } catch (error) {
        console.log("Password reset failed", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        if (!user) return res.status(400).json({
            success: false,
            message: "Authentication error"
        })
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Error in aunthentication", error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth }