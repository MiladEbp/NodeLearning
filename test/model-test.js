"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var user_1 = require("../model/user");
var util_1 = require("util");
describe("Test for model ", function () {
    it("Drop Collection", function (done) {
        user_1.userModel.findOneAndRemove({ name: 'Merdad' }, function (err, result) {
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
    }); // End it Drop
    it("Insert Collection", function (done) {
        var objSave = new user_1.userModel({
            username: 'Milad',
            password: '123'
        });
        user_1.userModel.findOne({ username: objSave['username'] }, function (err, result) {
            if (err) {
                assert_1.fail("function findOne is Wrong" + "\n");
            }
            else {
                if (result) {
                    assert_1.fail("this username save later");
                }
                else {
                    objSave.save(function (err, result) {
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
    }); // End it Insert
    it("Update Collection", function (done) {
        var index = { username: "ali" }, updateValue = { username: "milad", password: "admin" };
        user_1.userModel.findOneAndUpdate(index, updateValue, function (err, result) {
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
    }); // End it Update
    it("Read Collection", function (done) {
        user_1.userModel.find({}, function (err, result) {
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
        }); // End it Read
    });
});
