"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var check_class_1 = require("../bl/check-class");
var express_1 = require("express");
var log_class_1 = require("../lib/log-class");
var router = express_1.Router();
var check = new check_class_1.Check(), log = new log_class_1.WinstonLog();
router.use(bodyParser.urlencoded({ extended: false }));
router.get("/login", function (req, res) {
    log.writeLog("info", "Logout UserName is :", "Null");
    res.render('login', {
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2: 'Password'
    });
}); // router get Login page
router.post("/well", function (req, res) {
    var username = req.body.username, password = req.body.password;
    check.checkNullUsernamePassword(username, password, function (result) {
        if (result != false) {
            check.checkCollection(username, password, function (fetch) {
                if (fetch == false) {
                    log.writeLog("error", "Access Denied UserName is :", username);
                    res.send("Access Denied");
                }
                else {
                    var username_1 = fetch["username"], password_1 = fetch["password"];
                    log.writeLog("info", "Login UserName is : ", username_1);
                    res.render('well', {
                        title: "WellCome To in Page",
                        tit1: "Your UserName Is : ",
                        tit2: "Your Password Is : ",
                        userName: username_1,
                        password: password_1
                    }); // render well page
                }
            }); // check.checkCollection
        }
        else {
            log.writeLog("error", "UserName OR Password is Null", username);
            res.send("UserName OR Password is Null");
        } //else
    }); // check.checkNull
}); // router post well page
exports.index = router;
