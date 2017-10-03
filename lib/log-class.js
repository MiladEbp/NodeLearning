"use strict";
exports.__esModule = true;
var winston = require("winston");
require('winston-mongodb').MongoDB;
var WinstonLog = (function () {
    function WinstonLog() {
        this.infoLogFile = 'lib/log/result-log.log';
        this.dbUrl = 'mongodb://127.0.0.1:27017/test';
        this.collectionName = 'testLog';
        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    level: 'info',
                    filename: this.infoLogFile
                }),
                new (winston.transports.MongoDB)({
                    db: this.dbUrl,
                    collection: this.collectionName,
                    level: 'info'
                })
            ]
        });
    }
    WinstonLog.prototype.writeLog = function (type, massage, username) {
        var logger = this.logger;
        if (type == 'info') {
            logger.info(massage + username);
        }
        else if (type == 'error') {
            logger.error(massage + username);
        }
    };
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
    };
    return WinstonLog;
}());
exports.WinstonLog = WinstonLog;
//# sourceMappingURL=log-class.js.map