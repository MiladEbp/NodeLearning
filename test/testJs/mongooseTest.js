var
    assert = require("assert"),
    url = "mongodb://127.0.0.1:27017/test",
    mongoose = require("mongoose"),
    Promise = require("bluebird"),
    schema = mongoose.Schema;

var
    testSchema = new schema({ url: String, text: String, id: Number,
                              name: String, lastName: String},{collection: "milad"}),
    modelCollection = mongoose.model("Milad",testSchema);




describe("Test mongodb by mongoose", function(){

   before("connect to data base", function(done){
           mongoose.Promise = global.Promise;

           mongoose.connect(url,{useMongoClient: true},function(err){

               if(err){
                   assert.fail("Do Not Connecting"+"\n");
               }else{
                   console.log("Connect To DataBase"+"\n");
                   done();
               }// else for if err connect

           });// mongoose connect

   });////before


   it("Drop Collection",function(done){

                  modelCollection.remove({},function(err){
                        if(err){
                            assert.fail("do not Drop Collection"+"\n");
                        }else{

                            console.log("Remove Collection"+"\n");
                            done();
                        }
                    });// function Drop


    });// End It



    it("Insert in collection", function(done){

        var newModel = new modelCollection({
            name : "milad",
            lastName : "Ebrahimpour"
        });

        newModel.save(function(err, result){
            if(err){
               assert.fail("Don not Insert");
            }else{
                console.log(result);
                done();
            }
        });


    });// End It



   it("Update Document in Collection",function(done){
       var
           index = "Ebrahimpour",
           updateName = "Merdad" ;

        modelCollection.updateOne(index,{name: updateName , lastName: index},
            function(err, result){
                if(err){
                    assert.fail("don't Update Document in collection and Run Read it");
                }else{
                    console.log(result+"\n");
                    done();
                }
            }// Function updateOne
        );// updateOne
    });//End It


  /*  it("Delete Document in collection ", function(done){

        var name = "Merdad";
        modelCollection.findOneAndRemove({name: name}, function(err){
            if(err){
                assert.fail("don't Delete document");
            }else{
                console.log("Delete Document by name is : "+name+"\n");
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
