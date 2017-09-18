"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var connect_class_1 = require("../lib/connect-class");
var obj_connect = new connect_class_1.ConnectDB(), UserSchema = new mongoose_1.Schema({
    url: String,
    text: String,
    id: Number,
    username: String,
    password: String
}, { collection: "milad" });
function userModel(next) {
    obj_connect.createConnect(function (err, result) {
        if (err) {
            next(err, null);
        }
        else {
            next(err, mongoose_1.model("User", UserSchema, "milad"));
        } // else
    }); // obj_connect
} // End function userModel
exports.userModel = userModel;
