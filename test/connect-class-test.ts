import {connect, createConnection} from 'mongoose';
import {} from 'mocha';
import {fail} from 'assert';
import {userModel} from '../model/user';
import {isNull} from "util";

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


    it("Drop Collection", function(done){

        userModel(function(err, result){
            if(err){
                fail(" function userModel is Wrong");
            }else{
                result.findOneAndRemove({name:'Merdad'},function(err, result){
                    if(err){
                        fail("findOneAndRemove function is wrong");
                    }else{
                        if(isNull(result)){
                            fail("name is not find for delete from collection");
                        }else{
                            console.log("Delete Data form collection"+"\n");
                            done();
                        }// isNull result
                    }// else err
                });// findOneAndRemove
            }// err userModel object
        });// userModel object

    });// End it Drop

    it("Insert Collection", function(done){

        userModel(function(err, result){
            if(err){
                fail("function userModel is Wrong");
            }else{
                let objSave = new result({
                    username: 'Milad',
                    password: '123'
                });
                result.findOne({username: objSave['username']}, function(err, result){
                    if(err){
                        fail("function findOne is Wrong"+"\n");
                    }else{
                        if(result){
                            fail("this username save later");
                        }else{
                            objSave.save(function(err, result){
                                if(err){
                                    fail("error in function save "+"\n");
                                }else{
                                    console.log("Result after Insert in Collection"+"\n"+result+"\n");
                                    done();
                                }// else
                            });// function save
                        }// else result

                    }// else err
                });// findOne
            }// err function userModel
        });//userModel

    });// End it Insert

    it("Update Collection", function(done){

        let index = {username: "ali"},
            updateValue = {username: "milad", password: "admin"};

        userModel(function(err, result){
            if(err){
                fail("function userModel is Wrong");
            }else{
                result.findOneAndUpdate(index, updateValue, function(err, result){
                    if(err){
                        fail("function findOneAndUpdate is wrong");
                    }else{
                        if(isNull(result)){
                            fail("value in index variable is false");
                        }else{
                            console.log("Update is Done "+"\n");
                            done();
                        }
                    }// else
                });// findOneAndUpdate
            }// else err
        });// userModel
    });// End it Update


    it("Read Collection", function(done){
        userModel(function(err, result){
            if(err){
                fail("function userModel is Wrong");
            }else{
                result.find({}, function(err, result){
                    if(err){
                       fail("function findOne is wrong");
                    }else{
                        if(result.length == 0){
                            fail("Collection is Null");
                        }else{
                            console.log(result);
                            done();
                        }// else result
                    }//else err
                });// findOne
            }// else err
        });// userModel
    });// End it Read

});// describe