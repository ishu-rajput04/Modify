const userModel = require(".././models/user.model")
const blacklistModel = require(".././models/blacklistToken.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const redis = require("../config/cache")

async function registerController(req, res) {
    const { username, email, password } = req.body

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserExist) {
        return res.status(400).json({
            message: "user already exist."
        })
    }

    //hash the password
    const hashPswd = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password: hashPswd
    })
    const token = jwt.sign({
        username: user.username,
        id: user._id
    }, process.env.JWT_SECRET,
        { expiresIn: "3h" }
    )

    res.cookie("token", token)
    res.status(201).json({
        message: "user register successfully."
    })

}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!isUserExist) {
        return res.status(400).json({
            message: "user not exist."
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password)

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid password."
        })
    }

    const token = jwt.sign({
        username: isUserExist.username,
        id: isUserExist._id
    }, process.env.JWT_SECRET,
        { expiresIn: "3h" }
    )

    res.cookie("token", token)
    res.status(201).json({
        message: "user login successfully."
    })

}

async function getMecontroller(req, res) {
    // this is private route 
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "user fetched successfully",
        user
    })
}

async function logoutController(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString())

    res.status(201).json({
        message: "token add to blacklist",
    })
}
module.exports = {
    registerController, loginController, getMecontroller, logoutController
}