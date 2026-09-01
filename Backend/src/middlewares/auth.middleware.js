const redis = require("../config/cache")
const blacklistModel = require("../models/blacklistToken.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


// auth the user

async function authUser(req, res, next) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token is not found."
        })
    }

    const isTokenValid = await redis.get(token)

    if (isTokenValid) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    try {
        let decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decoded
        next()
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }

}

module.exports = { authUser }