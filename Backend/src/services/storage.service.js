const Imagekit = require("@imagekit/nodejs").default

const client = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATEKEY
})

async function uploadFile({ buffer, fileName, folder = "" }) {
    const file = await client.files.upload({
        file: await Imagekit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    });
    return file;
}
module.exports = {uploadFile}