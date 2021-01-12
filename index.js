const express = require("express");
const ytdl = require("ytdl-core");
const app = express();
const youtube = require('youtube-sr');

async function downloadVideo(video, res) {
        if (!video) return res.send('Fuck?');
        await youtube.search(video, { limit: 1 }).then(async video => {
            if (!video[0]) return res.send('No video found!');

            var stream = await ytdl(video[0].id, { quality: 'highestaudio' });
            await stream.pipe(res);
        }).catch(err => res.send('API Error!'));
};

app.get("/", (req, res) => {
    return res.send('mert cimke#4741');
});

app.get("/api/youtube/:title", async (req, res) => {
    let video = decodeURIComponent(req.params.title);
    if (!video) return res.send('Invalid Parameters!');
    return await downloadVideo(video, res);
});

app.listen(process.env.PORT, () => console.log("API Running!"));