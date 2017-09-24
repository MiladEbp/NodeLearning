import {connect, createConnection} from 'mongoose'
import {} from 'mocha';
import {fail} from 'assert';

let url = "mongodb://127.0.0.1:27017/test";


describe("Test class connect", function (){

    it("connect to DB ", function(done){

        connect(url,{useMongoClient: true},function(err){
            if(err){
                fail("Don't connect  to DataBase by Connect Function");
            }else{
                console.log("connect to DataBase by Connect Function"+"\n");
                done();
            }
        });// connect

    });// it connect


    it("create connection ", function(done){

        createConnection(url, function(err){
            if(err){
                fail("don't connect to DataBase by createConnection Function");
            }else{
                console.log("connect to DataBase by createConnection Function"+"\n");
                done();
            }
        });

    });// it create connection



});// describe