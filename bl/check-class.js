"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../model/user");
var Check = (function () {
    function Check() {
    }
    Check.prototype.checkNull = function (username, password, next) {
        if (!username || !password) {
            next(false);
        }
        else {
            next(true);
        }
    }; // checkNull Function
    Check.prototype.checkCollection = function (username, password, next) {
        user_1.userModel(function (err, result) {
            if (err) {
                console.log("function useModel is error");
            }
            else {
                result.findOne({ username: username, password: password }, function (err, result) {
                    if (err) {
                        console.log("findOne function is Error");
                    }
                    else {
                        if (!result) {
                            next(false, null);
                        }
                        else {
                            next(null, result);
                        } //else
                    } // else
                }); // findOne
            } //else
        });
    }; //checkCollection function
    return Check;
}()); // class
exports.Check = Check;
