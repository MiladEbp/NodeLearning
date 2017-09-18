import{Schema, model} from 'mongoose';
import {ConnectDB} from '../lib/connect-class';

let obj_connect = new ConnectDB(),
    UserSchema:Schema = new Schema({
        url: String,
        text: String,
        id: Number,
        username:String,
        password:String},
        {collection:"milad"});

    export function  userModel (next:any){

         obj_connect.createConnect(function(err, result){
             if(err){
                next(err, null);
             }else{
                 next(err,model("User",UserSchema,"milad"));
             }// else
         });// obj_connect

     }// End function userModel






