"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/// This class for Connect DB
var ConnectDb = (function () {
    /// This method is for connect To db
    function ConnectDb() {
        try {
            mongoose_1.connect(ConnectDb.url, { useMongoClient: true }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("connect db");
                }
            }); // connect
        }
        catch (e) {
            console.log(e);
        }
    } // FuncConnect
    ////////// This method  is for createConnect
    ConnectDb.prototype.createConnect = function () {
        return mongoose_1.createConnection(ConnectDb.url, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("create connection");
            } // else
        }); // createConnect
    };
    return ConnectDb;
}()); // ENd class ConnectDB
// This Url for using in method funcConnect and createConnect
ConnectDb.url = "mongodb://127.0.0.1:27017/test"; // if use static prameter you should append parameter to class name
exports.ConnectDb = ConnectDb;
