"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport = require("passport");
var user_1 = require("../model/user");
var localStrategy = require('passport-local').Strategy;
var bodyParser = require("body-parser");
var check_class_1 = require("../bl/check-class");
var log_class_1 = require("../lib/log-class");
var session = require("express-session");
var checkAuthentication_1 = require("../lib/checkAuthentication");
//*********************** PASSPORT  ***********************************************//
passport.use(new localStrategy(function (username, password, done) {
    console.log(username + '\n' + password);
    user_1.userModel.findOne({ username: username, password: password }, function (err, user) {
        console.log(user);
        if (err) {
            return done(err);
        }
        else if (!user) {
            return done('null', false);
        }
        else {
            return done('null', user);
        }
    });
}));
//********************************************************************************//
//serializeUser
//deserializeUser
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    console.log(id);
    user_1.userModel.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
// *******************************************************************//
var router = express_1.Router();
var check = new check_class_1.Check();
var log = new log_class_1.WinstonLog();
var Types;
(function (Types) {
    Types[Types["info"] = 0] = "info";
    Types[Types["error"] = 1] = "error";
})(Types || (Types = {}));
;
//*****************************************************************//
//session
// body-parser
// passport-initialize
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(passport.initialize());
router.use(session({
    secret: '6s5s5as55sd',
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
//*************************************************************//
// get for vash
router.get('/login', function (req, res) {
    // log.writeLog(Types[0],'Logout UserName is :','Null');
    res.render('login', {
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2: 'Password'
    }); //res.render
    //res.redirect('/well');
}); // router get Login page
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        console.log(err);
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            console.log(err);
            if (err) {
                return next(err);
            }
            return res.redirect('/well');
        });
    })(req, res, next);
});
//
//
// router.post('/login',function(req, res) {
//         let username: string = req.body.username,
//             password: string = req.body.password;
//
//         if((username).length === 0  || (password).length === 0) {
//             res.render('login', {
//                 title: 'LOGIN FORM(vash)',
//                 lab1: 'UserName',
//                 lab2: 'Password',
//                 user: 'Username and password is Null'
//             });// res.render
//
//         }else{
//             userModel.findOne({username: username}, function(err, result){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     if(!result) {
//                         res.render('login', {
//                             title: 'LOGIN FORM(vash)',
//                             lab1: 'UserName',
//                             lab2: 'Password',
//                             user: 'User Not Found'
//                         });// res.render
//                     }else if(result['password'] != password){
//                         res.render('login', {
//                             title: 'LOGIN FORM(vash)',
//                             lab1: 'UserName',
//                             lab2: 'Password',
//                             user: 'Password is False'
//                         });// res.render
//                     }else{
//                         req.session.username = result['username'];
//                         res.render('login',{
//                             title: 'LOGIN FORM(vash)',
//                             lab1: 'UserName',
//                             lab2:'Password',
//                             user:  req.session.username
//                         });// res.render
//                     }// else
//                 }
//
//
//             });// userModel.findOne
//         }// else
//
// });
router.get('/well', checkAuthentication_1.checkAuthentication, function (req, res) {
    res.render('well', {
        tit1: 'UserName',
        tit2: 'Password'
    });
});
exports.index = router;
