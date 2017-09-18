var
    assert = require("assert"),
    mongodb = require("mongodb"),
    url = "mongodb://127.0.0.1:27017/test";







describe("Test DataBase", function(){

    it("Drop collection", function(done){
        mongodb.connect(url, function(err,db){
            if(err){
                assert.fail("do not connecting ");
            }else{

                db.listCollections().toArray(function(err, collName){

                    if(collName.length == 0){

                         assert.fail("Collection not exist and run second it");

                    }else{

                        var collectionName = collName[0]['name'];
                        var dropCollection = db.collection(collectionName);
                        dropCollection.drop(function(err) {
                            if(err){
                                assert.fail("do not drop");
                            }else {
                                console.log("Drop collection");
                                done();
                            }
                        });


                    }

                });

            }
        });
    });/// End First it


   it("save in collection", function(done){
        // If the collection does not currently exist, insert operations will create the collection.
        var name = "shima",
            last_name="ahmadi",
            username="ahmad",
            password = "123";

           mongodb.connect(url,function(err,db){
              var coll = db.collection("milad");
             if(err){
                 //console.log("don't connect");
                  assert.fail("do not connect");
             }else{
                 coll.findOne({name: name},function(err,fetch){
                     if(fetch){
                        // console.log("repeat of record");
                        assert.fail("repeat of record");
                     }else{
                         coll.insertOne({name: name, last_name: last_name, username: username, password: password}, function(err, result){

                             if(err){
                                 //  console.log(err);
                                 assert.fail("do not insert");
                             }else{
                                 console.log(result);
                                 db.close();
                                 done();
                             }

                         }); //coll.save
                     }//else fetch
                 });

             } // else
         });// mongodb.connect

    });///End second  it


    it("Read record from Collection ", function(done){
        mongodb.connect(url, function(err,db){
            if(err){
                assert.fail("do not connect to db");
            }else{
                var collectionName = "milad";
                var collection = db.collection(collectionName);
                collection.find({}).toArray(function(err,result){
                   if(err){
                     assert.fail("Not result");
                   } else{
                       console.log(result);
                       done();
                    }
                });

            }
        });

    });//End third it


    it("Update record from collection", function(done){

        mongodb.connect(url,function(err, db){
            var collectionName = "milad";
            var collection = db.collection(collectionName);
            var newLastName = "Mehrdady";
            var index = {username:"ahmad"};
            var newIndex = {name:"shima",last_name:newLastName,username:"ahmad",password:"123"};
            collection.updateOne(index,newIndex,function(err,ack){
                if(err){
                    assert.fail("Update syntax is error");
                }else{
                    if(ack == false){
                        assert.fail("Update is Denie");
                    }else{
                        collection.findOne({last_name:newLastName},function(err,fetch){
                            if(!fetch){
                               assert.fail("This user not exist");
                            }else{
                                console.log(fetch);
                                done();
                            }
                        });
                    }
                }
            });
        });//mongodb connect

    });// End four It


});//describe

