const songModel = require("../models/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req, res) {
    const { mood } = req.body
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title,
            folder: "/Modify/Songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title,
            folder: "/Modify/Posters"
        })
    ])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        poster_url: posterFile.url,
        mood

    })
    res.status(201).json({
        message: "song created successfully",
        song
    })

}

async function getSong(req, res) {
    const { mood } = req.query

    const song = await songModel.findOne({
        mood
    })
    if (!song) {
        return res.status(400).json({
            message: "Incorrect mood."
        })
    }
    res.status(200).json({
        message: "song fetched successfully.",
        song
    })
}
module.exports = { uploadSong, getSong }