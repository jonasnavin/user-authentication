const whiteList = ["http://localhost:3000"]

const corsOperation = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Rejected br CORS"))
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ["Content-Type"]
}

module.exports = { corsOperation }