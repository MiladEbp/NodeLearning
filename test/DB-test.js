"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var assert_1 = require("assert");
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
}); // describe
