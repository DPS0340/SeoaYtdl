module.exports = function(link, callback) {
    const fs = require('fs');
    const ytdl = require('ytdl-core');
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffmpeg = require('fluent-ffmpeg');
    const video = link;
    ffmpeg.setFfmpegPath(ffmpegPath);
    let path = "./video/";
    fs.existsSync(path) || fs.mkdirSync(path);
    let uid = '_' + Math.random().toString().substr(2, 9);
    ytdl.getInfo(video, (err, info) => {
        if (err) throw err;
        console.log("downloading " + info['title'] + " as " + info['video_id'] + "!");
        ytdl(video, { quality: 140 }).pipe(fs.createWriteStream(path + info['video_id'] + uid + '_audioonly.m4a')).on("finish", () => {
            console.log("audio download complete!");
            ffmpeg(path + info['video_id'] + uid + '_audioonly.m4a')
            .audioQuality(0)
            .on("end", () => {
                console.log("convert to mp3 complete!");
                callback(path + info['video_id'] + uid + '_audioonly.mp3');
            })
            .save(path + info['video_id'] + uid + '_audioonly.mp3');
        });
    });
}