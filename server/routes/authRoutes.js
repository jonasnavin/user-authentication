const express = require('express')
const { login, logout, signup, verifyEmail, forgotPassword } = require("../controllers/authController")

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)

module.exports = router