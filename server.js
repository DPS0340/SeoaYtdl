const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const downloader = require('./src/server/func/downloader');
const path = require("path");
const fs = require("fs");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false })) 
app.get('/',function(req,res){
    res.render('root.html')
});
app.post('/download',function(req,res){
    const url = req.body.url;
    downloader(url, (video) => {res.download(video, 'music.mp3', function(err){
        if(err) throw err;
      });
    });
});
const server = app.listen(80, function() {
    console.log("Seoa Ytdl Server on!");
});
