import * as winston from 'winston';

export class winstonLog {

    private path = "lib/log/result-log.log";

    writeLog(massage:string , username:string){
        let logger = new (winston.Logger)({
            transports : [
                new (winston.transports.Console)(),
                new(winston.transports.File)({
                    level : 'info',
                    filename : this.path
                })
            ]
        });// let log

         logger.info(massage+username);
    }// writeLog
}// class
