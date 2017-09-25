"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
require('winston-mongodb').MongoDB;
////// This Class for using  Logging in my project
var WinstonLog = (function () {
    function WinstonLog() {
        //// This variable is Path of file for Write log into file
        this.infoLogFile = "lib/log/result-log.log";
        /// This using transports options in winston
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    level: 'info',
                    filename: this.infoLogFile
                }),
                new (winston.transports.MongoDB)({
                    db: 'mongodb://127.0.0.1:27017/test',
                    collection: 'collectionTest',
                    level: 'info'
                })
            ]
        }); // let log
    }
    /// This method for Writing different Log into file
    /// input variable is  : massage and username and type || massage: "massage in log file", username: "enter username in form", type: "info , error"
    WinstonLog.prototype.writeLog = function (type, massage, username) {
        var logger = this.logger;
        if (type == 'info') {
            logger.info(massage);
        }
        else if (type == 'error') {
            logger.error(massage + username);
        }
    }; //End Method of writeLog
    WinstonLog.prototype.readLog = function (options, next) {
        var logger = this.logger;
        logger.query(options, function (err, results) {
            if (err) {
                next(false);
            }
            else {
                next(results);
            }
        });
    }; // End method readLog
    return WinstonLog;
}()); // class
exports.WinstonLog = WinstonLog;
