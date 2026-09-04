const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "song url is must"]
    },
    poster_url: {
        type: String,
        required: [true, "poster_url is must"]
    },
    title: {
        type: String,
        required: [true, "title is must"]
    },
    mood: {
        type: String,
        enum: {
            values: ["angry", "sad", "happy", "surprised"],
            message: "enum this is"
        }
    }
})

const songModel = mongoose.model("Songs", songSchema)

module.exports = songModel