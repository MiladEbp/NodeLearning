"use strict";
exports.__esModule = true;
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}
exports.checkAuthentication = checkAuthentication;
//# sourceMappingURL=checkAuthentication.js.map