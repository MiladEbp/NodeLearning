"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bCrypt = require("bcrypt");
function verifyPassword(user, password, next) {
    bCrypt.compareSync(password, user.password, function (err) {
        if (err) {
            return next(false);
        }
        else {
            return next(true);
        }
    });
}
exports.verifyPassword = verifyPassword;
verifyPassword('milad', 'admin', function (err) {
    console.log(err);
});
