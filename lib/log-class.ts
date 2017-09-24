import * as winston from 'winston';

////// This Class for using  Logging in my project
export class WinstonLog {

    //// This variable is Path of file for Write log into file
    private infoLogFile = "lib/log/result-log.log";

    /// This using transports options in winston
    public   logger = new (winston.Logger)({
                            transports : [
                                new (winston.transports.Console)(),
                                new(winston.transports.File)({
                                    level : 'info',
                                    filename : this.infoLogFile
                                })
                            ]
                        });// let log


    /// This method for Writing different Log into file
    /// input variable is  : massage and username and type || massage: "massage in log file", username: "enter username in form", type: "info , error"
    writeLog(type:string , massage:string , username:string){

        let logger = this.logger;

        if(type == 'info'){
            logger.info(massage+username);
        }else if(type == 'error'){
            logger.error(massage+username);
        }

    }//End Method of writeLog

   readLog(options, next:any){

       let logger = this.logger;
   logger.query(options, function (err, results) {
           if (err) {
                next(false);
           }else{
               next(results);
           }
       });
   }// End method readLog

}// class
