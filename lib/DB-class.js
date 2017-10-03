"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ConnectDb = (function () {
    function ConnectDb() {
        try {
            mongoose_1.connect(ConnectDb.url, { useMongoClient: true }, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("connect db");
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    ConnectDb.prototype.createConnect = function () {
        return mongoose_1.createConnection(ConnectDb.url, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("create connection");
            }
        });
    };
    return ConnectDb;
}());
ConnectDb.url = "mongodb://127.0.0.1:27017/test";
exports.ConnectDb = ConnectDb;
//# sourceMappingURL=DB-class.js.map