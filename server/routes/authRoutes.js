const express = require('express')
const { login, logout, signup, verifyEmail, forgotPassword, resetPassword } = require("../controllers/authController")

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword)

module.exports = router