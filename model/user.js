"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var DB_class_1 = require("../lib/DB-class");
var connectDb = new DB_class_1.ConnectDb();
var createconnect = connectDb.createConnect();
var UserSchema = new mongoose_1.Schema({
    url: String,
    text: String,
    id: Number,
    username: String,
    password: String
}, { collection: "milad" });
exports.userModel = mongoose_1.model("User", UserSchema, "milad");
//# sourceMappingURL=user.js.map