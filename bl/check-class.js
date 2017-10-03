"use strict";
exports.__esModule = true;
var user_1 = require("../model/user");
var Check = (function () {
    function Check() {
    }
    Check.prototype.checkNullUsernamePassword = function (username, password, next) {
        if (!username || !password) {
            next(false);
        }
        else {
            next(true);
        }
    };
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
                }
            }
        });
    };
    Check.prototype.checkCollection = function (username, password, next) {
        var query = { username: username, password: password };
        this.getUser(query, function (result) {
            if (result == false) {
                next(false);
            }
            else {
                next(result);
            }
        });
    };
    return Check;
}());
exports.Check = Check;
//# sourceMappingURL=check-class.js.map