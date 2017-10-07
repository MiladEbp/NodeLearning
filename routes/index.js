"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var user_1 = require("../model/user");
var bodyParser = require("body-parser");
var check_class_1 = require("../bl/check-class");
var log_class_1 = require("../lib/log-class");
var session = require("express-session");
var checkAuthentication_1 = require("../lib/checkAuthentication");
var mongoStore = require('connect-mongo')(session);
var localStrategy = require('passport-local').Strategy;
var router = express.Router();
passport.use(new localStrategy(function (username, password, done) {
    user_1.userModel.findOne({ username: username, password: password }, function (err, user) {
        if (err) {
            return done(err);
        }
        else if (!user) {
            return done(null, false);
        }
        else {
            return done(null, user);
        }
    });
}));
passport.serializeUser(function (user, next) {
    next(null, user._id);
});
passport.deserializeUser(function (id, next) {
    user_1.userModel.findById(id, function (err, user) {
        next(null, user);
    });
});
var check = new check_class_1.Check();
var log = new log_class_1.WinstonLog();
var Types;
(function (Types) {
    Types[Types["info"] = 0] = "info";
    Types[Types["error"] = 1] = "error";
})(Types || (Types = {}));
;
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(passport.initialize());
router.use(session({
    secret: '6s5s5as55sd',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url: 'mongodb://127.0.0.1:27017/test',
        collection: 'sessionLogin',
        autoRemove: 'disabled',
        ttl: 2 * 24 * 60 * 60
    })
}));
router.use(passport.initialize());
router.use(passport.session());
router.get('/login', function (req, res) {
    res.render('login', {
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2: 'Password'
    });
});
router.post('/login', function (req, res, next) {
    var username = req.body.username, password = req.body.password;
    if ((username).length === 0 || (password).length === 0) {
        res.render('login', {
            title: 'LOGIN FORM(vash)',
            lab1: 'UserName',
            lab2: 'Password',
            message: 'UserName Or Password filed is Null'
        });
    }
    else {
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            else if (!user) {
                res.render('login', {
                    title: 'LOGIN FORM(vash)',
                    lab1: 'UserName',
                    lab2: 'Password',
                    message: 'User  Not Found'
                });
                res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    next(err);
                }
                else {
                    res.redirect('/well');
                }
            });
        })(req, res, next);
    }
});
router.get("/well", checkAuthentication_1.checkAuthentication, function (req, res) {
    res.render("well", {
        tit1: 'UserName :',
        tit2: 'Password :',
        userName: req.user.username,
        password: req.user.password
    });
});
router.post('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/login');
        }
    });
});
exports.index = router;
//# sourceMappingURL=index.js.map