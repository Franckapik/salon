const express = require('express');
const http = require('http');
const os = require('os');
const path = require('path');
const controller = require('./controller'); //controller.js
const cronData = require('./cronData');

const app = express();

//controller.readAddTemp();
//controller.queryData();

//routes
app.get ('/', controller.Index);

app.listen(8080);
console.log('Port : 8080');

//configure app

app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use(express.static('views'));
