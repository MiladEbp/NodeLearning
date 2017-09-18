"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var assert_1 = require("assert");
var user_1 = require("../model/user");
var util_1 = require("util");
var url = "mongodb://127.0.0.1:27017/test";
describe("Test class connect", function () {
    it("connect to DB ", function (done) {
        mongoose_1.connect(url, { useMongoClient: true }, function (err) {
            if (err) {
                assert_1.fail("Don't connect  to DataBase by Connect Function");
            }
            else {
                console.log("connect to DataBase by Connect Function" + "\n");
                done();
            }
        }); // connect
    }); // it connect
    it("create connection ", function (done) {
        mongoose_1.createConnection(url, function (err) {
            if (err) {
                assert_1.fail("don't connect to DataBase by createConnection Function");
            }
            else {
                console.log("connect to DataBase by createConnection Function" + "\n");
                done();
            }
        });
    }); // it create connection
    it("Drop Collection", function (done) {
        user_1.userModel(function (err, result) {
            if (err) {
                assert_1.fail(" function userModel is Wrong");
            }
            else {
                result.findOneAndRemove({ name: 'Merdad' }, function (err, result) {
                    if (err) {
                        assert_1.fail("findOneAndRemove function is wrong");
                    }
                    else {
                        if (util_1.isNull(result)) {
                            assert_1.fail("name is not find for delete from collection");
                        }
                        else {
                            console.log("Delete Data form collection" + "\n");
                            done();
                        } // isNull result
                    } // else err
                }); // findOneAndRemove
            } // err userModel object
        }); // userModel object
    }); // End it Drop
    it("Insert Collection", function (done) {
        user_1.userModel(function (err, result) {
            if (err) {
                assert_1.fail("function userModel is Wrong");
            }
            else {
                var objSave_1 = new result({
                    username: 'Milad',
                    password: '123'
                });
                result.findOne({ username: objSave_1['username'] }, function (err, result) {
                    if (err) {
                        assert_1.fail("function findOne is Wrong" + "\n");
                    }
                    else {
                        if (result) {
                            assert_1.fail("this username save later");
                        }
                        else {
                            objSave_1.save(function (err, result) {
                                if (err) {
                                    assert_1.fail("error in function save " + "\n");
                                }
                                else {
                                    console.log("Result after Insert in Collection" + "\n" + result + "\n");
                                    done();
                                } // else
                            }); // function save
                        } // else result
                    } // else err
                }); // findOne
            } // err function userModel
        }); //userModel
    }); // End it Insert
    it("Update Collection", function (done) {
        var index = { username: "ali" }, updateValue = { username: "milad", password: "admin" };
        user_1.userModel(function (err, result) {
            if (err) {
                assert_1.fail("function userModel is Wrong");
            }
            else {
                result.findOneAndUpdate(index, updateValue, function (err, result) {
                    if (err) {
                        assert_1.fail("function findOneAndUpdate is wrong");
                    }
                    else {
                        if (util_1.isNull(result)) {
                            assert_1.fail("value in index variable is false");
                        }
                        else {
                            console.log("Update is Done " + "\n");
                            done();
                        }
                    } // else
                }); // findOneAndUpdate
            } // else err
        }); // userModel
    }); // End it Update
    it("Read Collection", function (done) {
        user_1.userModel(function (err, result) {
            if (err) {
                assert_1.fail("function userModel is Wrong");
            }
            else {
                result.find({}, function (err, result) {
                    if (err) {
                        assert_1.fail("function findOne is wrong");
                    }
                    else {
                        if (result.length == 0) {
                            assert_1.fail("Collection is Null");
                        }
                        else {
                            console.log(result);
                            done();
                        } // else result
                    } //else err
                }); // findOne
            } // else err
        }); // userModel
    }); // End it Read
}); // describe
