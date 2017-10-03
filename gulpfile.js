"use strict";
exports.__esModule = true;
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var app = 'app.js';
gulp.task('default', function () {
    nodemon({
        script: app
    });
});
//# sourceMappingURL=gulpfile.js.map