import {WinstonLog} from '../lib/log-class';
import {} from 'mochha';
import {fail} from "assert";



let winstonLog = new WinstonLog();

describe("Test For log ", function(){

    it("Write Log in File", function(done){
        let username = "test",
            massage = "this is test ",
            type = "error";
        winstonLog.writeLog(type, massage , username);

        done();
    });// End It for Write Log in File



    it("Reade Log from File", function(done){

        let options = {
            limit: 1,
            start: 0,
            order: 'desc',
            fields: ['message','timestamp']
        };
        winstonLog.readLog(options , function(result){
            if(result == false){
                fail("Don't Read File");
            }else{
                console.log(result);
                done();
            }
        });

    });// End It for Reade Log from File

});// describe
