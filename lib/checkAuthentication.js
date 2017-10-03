"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/well');
    }
    else {
        res.redirect('/login');
    }
}
exports.checkAuthentication = checkAuthentication;
