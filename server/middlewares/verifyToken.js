const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../configs/config")

const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({
        success: false,
        message: "Unauthorized - token not provided"
    })

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (!decoded) return res.status(401).json({
            success: false,
            message: "Unauthorized - invalid token"
        })
        req.userId = decoded.userId
        next()
    } catch (error) {
        console.log("Error in verification token", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { verifyToken }