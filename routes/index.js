"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var check_class_1 = require("../bl/check-class");
var express_1 = require("express");
var log_class_1 = require("../lib/log-class");
var session = require("express-session");
var DB_class_1 = require("../lib/DB-class");
var router = express_1.Router();
var mongoStore = require('connect-mongo')(session);
var connect = new DB_class_1.ConnectDb();
var connection = connect.createConnect();
var check = new check_class_1.Check();
var log = new log_class_1.WinstonLog();
var Types;
(function (Types) {
    Types[Types["info"] = 0] = "info";
    Types[Types["error"] = 1] = "error";
})(Types || (Types = {}));
;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({
    secret: 'a55dede445e77cd5fr',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: connection, collection: 'testLog' })
}));
router.get("/login", function (req, res) {
    log.writeLog(Types[0], 'Logout UserName is :', 'Null');
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
                    log.writeLog(Types[0], "Login UserName is : ", username_1);
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
            log.writeLog(Types[1], "UserName OR Password is Null", username);
            res.send("UserName OR Password is Null");
        } //else
    }); // check.checkNull
}); // router post well page
exports.index = router;
