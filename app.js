"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var index_1 = require("./routes/index");
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", index_1.index);
app.use(function (err, req, res, next) {
    res.status(err.status || 404);
    next(new Error('File not found'));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.massage;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
// app.get('/',function(req, res){
//     res.send("Heloo");
// });
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
module.exports = app;
