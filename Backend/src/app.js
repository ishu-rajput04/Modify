const express = require("express")
const authRouter = require("./routes/auth.routes")

const app = express()

const cookieParser = require("cookie-parser")
//middleware 
app.use(express.json())
app.use(cookieParser())
app.use

app.use('/route/auth', authRouter)

module.exports = app