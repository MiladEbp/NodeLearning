"use strict";
exports.__esModule = true;
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
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
module.exports = app;
//# sourceMappingURL=app.js.map