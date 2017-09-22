"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var check_class_1 = require("../bl/check-class");
var express_1 = require("express");
var log_class_1 = require("../lib/log-class");
var router = express_1.Router();
var check = new check_class_1.Check(), log = new log_class_1.winstonLog();
router.use(bodyParser.urlencoded({ extended: false }));
router.get("/login", function (req, res) {
    res.render('login', {
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2: 'Password'
    });
}); // router get Login page
router.post("/well", function (req, res) {
    var username = req.body.username, password = req.body.password;
    check.checkNull(username, password, function (result) {
        if (result != false) {
            check.checkCollection(username, password, function (err, fetch) {
                if (err != false) {
                    var username_1 = fetch["username"], password_1 = fetch["password"];
                    res.render('well', {
                        title: "WellCome To in Page",
                        tit1: "Your UserName Is : ",
                        tit2: "Your Password Is : ",
                        userName: username_1,
                        password: password_1
                    }); // render well page
                    log.writeLog("Login UserName is : ", username_1);
                }
                else {
                    res.send("Access Denied");
                    log.writeLog("Access Denied UserName is :", username);
                }
            }); // check.checkCollection
        }
        else {
            res.send("UserName OR Password is Null");
        } //else
    }); // check.checkNull
}); // router post well page
router.get("/login", function (req, res) {
    res.redirect('login');
});
exports.index = router;
