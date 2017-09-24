import {} from'mongoose';
import {} from 'mocha';
import{fail} from 'assert';
import {Check} from '../bl/check-class';

let object_check  = new Check();


describe("Test For check-class.ts in bl", function(){

    it("Check is function of checkNullUsernamePassword ", function(done){
        let username = "",
            password = "123";

        object_check.checkNullUsernamePassword(username , password , function(result){

            if(result != true){
                fail("username OR Password is null");
            }else{
                console.log("username OR Password is set");
                done();
            }// else

        });// object_check
    });// it  for Check is function of checkNullUsernamePassword

    it("Test For checkCollection and get user",  function(done){
        let username = "milad",
            password = "admin";
        object_check.checkCollection(username,  password, function( result){

            if(result == false){
                fail("Access Denied");
            }else{
                console.log(result);
                done();
            }
        });//
    });// it for


});//describe









