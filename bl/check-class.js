"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../model/user");
////////// This Class is Check username and password that null field in view and get user  by username and password in collection
var Check = (function () {
    function Check() {
    }
    //
    ////// This method is checkNullUsernamePassword
    Check.prototype.checkNullUsernamePassword = function (username, password, next) {
        if (!username || !password) {
            next(false);
        }
        else {
            next(true);
        }
    }; //  End checkNullUsernamePassword
    // /////////// This method for GetUser by UserName and Password///////////////////////////////////
    Check.prototype.getUser = function (query, next) {
        user_1.userModel.findOne(query, function (err, result) {
            if (err) {
                console.log("findOne function is Error");
            }
            else {
                if (!result) {
                    next(false);
                }
                else {
                    next(result);
                } //else
            } // else
        }); // findOne
    }; // End method GetUser
    ///// This method Calling method : getUser, getUsers, createUser, updateUser//////////////////////////
    ///// import for me : fro using function checkCollection you should using switch case in method for switch other method inside in method
    Check.prototype.checkCollection = function (username, password, next) {
        var query = { username: username, password: password };
        //// Calling getUser method
        this.getUser(query, function (result) {
            if (result == false) {
                next(false);
            }
            else {
                next(result);
            } // else
        }); // End Calling method getUser
    }; //checkCollection function
    return Check;
}()); // class
exports.Check = Check;
