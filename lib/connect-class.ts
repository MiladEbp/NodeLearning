import {connect, createConnection} from 'mongoose';


export class ConnectDB{

    public static url:string = "mongodb://127.0.0.1:27017/test";// if use static prameter you should append parameter to class name


     funcConnect(next:any){

        try{

            connect(ConnectDB.url,{useMongoClient: true}, function(err){
                if(err){
                    next(err,null);
                }else{
                    next(err,true);
                }
            });// connect

        }catch(e){
            console.log(e);
        }

    }// FuncConnect


    createConnect(next:any){

        try{
            this.funcConnect(function(err, result){
                if(result == true){
                    createConnection(ConnectDB.url,function(err){
                        if(err){
                            next(err,null);
                        }else {
                            next(err,true);
                        } // else
                    });// crateConnection
                }else{
                    console.log("don't connect to DB by first function");
                }// else
            });// funcConnect
        }catch(e){
            console.log(e);
        }


    }// createConnect

}// ENd class ConnectDB






