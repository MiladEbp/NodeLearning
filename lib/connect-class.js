"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ConnectDB = (function () {
    function ConnectDB() {
    }
    ConnectDB.prototype.funcConnect = function (next) {
        try {
            mongoose_1.connect(ConnectDB.url, { useMongoClient: true }, function (err) {
                if (err) {
                    next(err, null);
                }
                else {
                    next(err, true);
                }
            }); // connect
        }
        catch (e) {
            console.log(e);
        }
    }; // FuncConnect
    ConnectDB.prototype.createConnect = function (next) {
        try {
            this.funcConnect(function (err, result) {
                if (result == true) {
                    mongoose_1.createConnection(ConnectDB.url, function (err) {
                        if (err) {
                            next(err, null);
                        }
                        else {
                            next(err, true);
                        } // else
                    }); // crateConnection
                }
                else {
                    console.log("don't connect to DB by first function");
                } // else
            }); // funcConnect
        }
        catch (e) {
            console.log(e);
        }
    }; // createConnect
    return ConnectDB;
}()); // ENd class ConnectDB
ConnectDB.url = "mongodb://127.0.0.1:27017/test"; // if use static prameter you should append parameter to class name
exports.ConnectDB = ConnectDB;
