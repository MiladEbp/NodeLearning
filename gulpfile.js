"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var app = 'app.js';
gulp.task('default', function () {
    nodemon({
        script: app
    });
});
