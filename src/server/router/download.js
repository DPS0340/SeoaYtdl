module.exports = function(app)
{
    const express = require('express');
    const router = express.Router();
    const bodyParser = require('body-parser');
    const downloader = require('./src/server/func/downloader');
    app.post('/',function(req,res){
        const url = req.body.url;
        downloader(url);
        res.render('downloading.html');
    });
}