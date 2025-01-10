const dotenv = require("dotenv")

dotenv.config()

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV,
    APP_ADMIN: process.env.APP_ADMIN,
    APP_PASSWORD: process.env.APP_PASSWORD,
    CLIENT_URL: process.env.CLIENT_URL
};
