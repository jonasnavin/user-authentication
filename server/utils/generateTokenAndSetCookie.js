const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../configs/config");

const generateTokenAndSetCookie = (res, userId) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
    }

    try {
        const token = jwt.sign({ userId }, JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            samsite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return token
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
}

module.exports = { generateTokenAndSetCookie }