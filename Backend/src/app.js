const express = require("express")
const authRouter = require("./routes/auth.routes")
const songRouter = require("./routes/song.routes")
const cors = require("cors")
const app = express()

const cookieParser = require("cookie-parser")

//middleware 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/route/auth', authRouter)
app.use('/route/song', songRouter)

module.exports = app