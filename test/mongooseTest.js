var
    assert = require("assert"),
    url = "mongodb://127.0.0.1:27017/test",
    mongoose = require("mongoose"),
    schema = mongoose.Schema;

const
    testSchema = new schema({ url: String, text: String, id: Number},
                            { collection : 'milad' }),
    modelCollection = mongoose.model("milad", testSchema);




describe("Test mongodb by mongoose", function(){

   before("connect to data base", function(done){

           mongoose.connect(url,{useMongoClient: true},function(err){

               if(err){
                   assert.fail("Do Not Connecting ");
               }else{
                   console.log("Connect To DataBase \n");
                   done();
               }// else for if err connect

           });// mongoose connect

   });///before


    it("Drop Collection",function(done){

        var connection = mongoose.connection,
            listCollection = connection.db.listCollections();

        listCollection.toArray(function(err,result){
            if(err){
              assert.fail("error in Array");
            }else{
                if(result.length == 0){
                    assert.fail("No exist collection in Mongodb  and Run Insert it  \n");
                }else{
                   // console.log("collection Names : "+result[0]['name']);
                    var collection = result[0]['name'];

                    connection.collections[collection].drop(function(err){
                        if(err){
                            assert.fail("don't Drop Collection"+collection);
                        }else{
                            console.log("Drop collection "+collection+" is done \n");
                            done();
                        }
                    });// function Drop

                }// else exit collection
            }//else
        });//Function ListCollection
    });// End It



    it("Insert in collection", function(done){

        var connection = mongoose.connection;
        var collectionName = "milad",
            name = "shima",
            last_name = "Mehrany",
            userName = "admin",
            password = "123";
        connection.collections[collectionName].insert({
                                                        name:     name,
                                                        lastName: last_name,
                                                        userName: userName,
                                                        password: password},
            function(err){

                if(err){
                   assert.fail("don't Insert in collection : "+ collectionName);
                }else{
                    console.log("Insert data in collection : "+collectionName+"\n");
                    done();
                }// else
            }// function insert

        );// Insert in collection
    });// End It



    it("Update Document in Collection",function(done){
        var connection = mongoose.connection,
            updateName = "sorosh",
            index = {userName : "admin"};
        var collectionName = "milad";

        connection.collections[collectionName].updateOne(index,{name: updateName,
                                                                lastName: "Mehrany",
                                                                userName: "admin",
                                                                password: "123"},
            function(err){
                if(err){
                    assert.fail("don't Update Document in collection "+ collectionName+"and Run Read it");
                }else{
                    console.log("update document in collection : "+collectionName+"\n");
                    done();
                }
            }// Function updateOne
        );// updateOne
    });//End It


  /*  it("Delete Document in collection ", function(done){

        var username = "admin";
        modelCollection.findOneAndRemove({userName: username}, function(err){
            if(err){
                assert.fail("don't Delete document");
            }else{
                console.log("Delete Document by username is : "+username+"\n");
                done();
            }
        });// findOneAndRemove

    });*/// End it


    it("Read collection ", function(done){

        modelCollection.find({}, function(err, result){
            if(result.length === 0){
                assert.fail("user not exists ");
            }else{
                console.log("Find is collection : \n"+ result);
                done();
            }

        });//db.on

    });// End It

});// describe
