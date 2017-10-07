import * as express from 'express';
import * as passport from 'passport';
import {userModel} from '../model/user';
import * as bodyParser from 'body-parser';
import {Check} from '../bl/check-class';
import {WinstonLog} from '../lib/log-class';
import * as session from 'express-session';
import {} from 'enum';
import {checkAuthentication} from '../lib/checkAuthentication';


let mongoStore = require('connect-mongo')(session);
let localStrategy = require('passport-local').Strategy;
const router: express.Router = express.Router();

//*********************** PASSPORT  ***********************************************//
passport.use(new localStrategy(function(username:any, password:any, done:any){

    userModel.findOne({username: username, password: password}, function(err, user){

        if(err){
            return done(err);
        }else if(!user) {
            return done(null, false);
        }else{
            return done(null, user);
        }
    });
}));

//********************************************************************************//
//serializeUser
//deserializeUser

passport.serializeUser(function(user, next) {
    next(null, user._id);
});

passport.deserializeUser(function(id, next) {
    userModel.findById(id, function(err, user){
        next(null, user);
    });
});

// *************************   Object   ******************************************//

let check   = new  Check();
let  log    = new  WinstonLog();
// let connect = new ConnectDb();
enum Types{ info , error };



//****************************** RouterUse  *************************************//

//session
// body-parser
// passport-initialize

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(passport.initialize());

router.use(session({
    secret: '6s5s5as55sd',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url:'mongodb://127.0.0.1:27017/test',
        collection:'sessionLogin',
        autoRemove: 'disabled',
        ttl:2*24*60*60
    })
}));

router.use(passport.initialize());
router.use(passport.session());


//******************************************************************//

// GET : loginPage  - WellPage
// POST : loginPage - WellPage - logoutPage


router.get('/login', function(req, res){
   // log.writeLog(Types[0],'Logout UserName is :','Null');
        res.render('login',{
            title: 'LOGIN FORM(vash)',
            lab1: 'UserName',
            lab2:'Password'
        });//res.render
   //res.redirect('/well');
});// router get Login page


router.post('/login', function(req:any, res, next) {
    let username:string = req.body.username,
        password:string = req.body.password;
    if((username).length === 0 || (password).length === 0){
        res.render('login', {
            title: 'LOGIN FORM(vash)',
            lab1: 'UserName',
            lab2:'Password',
            message:'UserName Or Password filed is Null'
        });
    }else {
        passport.authenticate('local', function (err: any, user: any) {
            if (err) {
                return next(err);
            } else if (!user) {

                res.render('login', {
                    title: 'LOGIN FORM(vash)',
                    lab1: 'UserName',
                    lab2:'Password',
                    message:'User  Not Found'
                });// res.render
                 res.redirect('/login');

            }// else if
            req.logIn(user, function (err: any) {
                if (err) {
                     next(err);
                } else {

                        res.redirect('/well');

                }// else
            });// LogIn
        })(req, res, next);
        //passport.authenticate
    }// else
});


router.get("/well", checkAuthentication,function(req, res){
    res.render("well", {
        tit1: 'UserName :',
        tit2: 'Password :',
        userName:req.user.username,
        password:req.user.password
    });

});


//Destroy Session
router.post('/logout', function(req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/login');
        }
    })
});













export const index: express.Router = router;