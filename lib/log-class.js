"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var winstonLog = (function () {
    function winstonLog() {
        this.path = "lib/log/result-log.log";
    }
    winstonLog.prototype.writeLog = function (massage, username) {
        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    level: 'info',
                    filename: this.path
                })
            ]
        }); // let log
        logger.info(massage + username);
    }; // writeLog
    return winstonLog;
}()); // class
exports.winstonLog = winstonLog;
