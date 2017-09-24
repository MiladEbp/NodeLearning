"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var check_class_1 = require("../bl/check-class");
var object_check = new check_class_1.Check();
describe("Test For check-class.ts in bl", function () {
    it("Check is function of checkNullUsernamePassword ", function (done) {
        var username = "", password = "123";
        object_check.checkNullUsernamePassword(username, password, function (result) {
            if (result != true) {
                assert_1.fail("username OR Password is null");
            }
            else {
                console.log("username OR Password is set");
                done();
            } // else
        }); // object_check
    }); // it  for Check is function of checkNullUsernamePassword
    it("Test For checkCollection and get user", function (done) {
        var username = "milad", password = "admin";
        object_check.checkCollection(username, password, function (result) {
            if (result == false) {
                assert_1.fail("Access Denied");
            }
            else {
                console.log(result);
                done();
            }
        }); //
    }); // it for
}); //describe
