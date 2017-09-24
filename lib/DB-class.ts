import {connect, createConnection} from 'mongoose';

/// This class for Connect DB
export class ConnectDb{

    // This Url for using in method funcConnect and createConnect
    public static url:string = "mongodb://127.0.0.1:27017/test";// if use static prameter you should append parameter to class name

/// This method is for connect To db
     constructor(){

        try{

            connect(ConnectDb.url,{useMongoClient: true}, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("connect db");
                }
            });// connect

        }catch(e){
            console.log(e);
        }

    }// FuncConnect

////////// This method  is for createConnect
    createConnect(){

                  return  createConnection(ConnectDb.url,function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("create connection");
                        } // else
                    });// createConnect
    }

}// ENd class ConnectDB






