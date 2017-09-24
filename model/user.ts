import{Schema, model} from 'mongoose';
import {ConnectDb} from '../lib/DB-class';

let connectDb = new ConnectDb();
let createconnect =  connectDb.createConnect();

let UserSchema:Schema = new Schema({
        url: String,
        text: String,
        id: Number,
        username:String,
        password:String},
        {collection:"milad"});

export let userModel =  model("User",UserSchema,"milad");

     // export function  userModel (next:any){
     //
     //  obj_connect.createConnect(function(err, result){
     //      if(err){
     //         next(err, null);
     //      }else{
     //          next(err,);
     //      }// else
     //  });// obj_connect

 //}// End function userModel






