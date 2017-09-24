import {fail} from 'assert';
import {userModel} from '../model/user';
import {isNull} from 'util';


describe("Test for model ", function(){

    it("Drop Collection", function(done){

        userModel.findOneAndRemove({name:'Merdad'},function(err, result){
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


    });// End it Drop

    it("Insert Collection", function(done){

        let objSave = new userModel({
            username: 'Milad',
            password: '123'
        });
        userModel.findOne({username: objSave['username']}, function(err, result){
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



    });// End it Insert

    it("Update Collection", function(done){

        let index = {username: "ali"},
            updateValue = {username: "milad", password: "admin"};


        userModel.findOneAndUpdate(index, updateValue, function(err, result){
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

    });// End it Update


    it("Read Collection", function(done){

        userModel.find({}, function(err, result){
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
        });// End it Read
    });


});

