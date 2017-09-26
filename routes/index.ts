import * as bodyParser from 'body-parser';
import {Check} from '../bl/check-class';
import {Router} from 'express';
import {WinstonLog} from '../lib/log-class';
import * as session from 'express-session';
import {ConnectDb} from '../lib/DB-class';
import {} from 'enum';




const router: Router = Router();
const mongoStore = require('connect-mongo')(session);


let connect = new ConnectDb();
let connection = connect.createConnect();
let check = new Check();
let  log = new  WinstonLog();


enum Types{ info , error };

router.use(bodyParser.urlencoded({ extended: false }));

router.use(session({
    secret: 'a55dede445e77cd5fr',
    resave : false,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection : connection, collection: 'testLog'})
}));

router.get("/login", function(req, res){


    log.writeLog(Types[0],'Logout UserName is :','Null');
    res.render('login',{
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2:'Password'
    });
});// router get Login page




router.post("/well", function(req, res){
    let username = req.body.username,
        password = req.body.password;

    check.checkNullUsernamePassword(username, password, function(result){
        if(result != false){
            check.checkCollection(username, password, function(fetch){
                if(fetch == false){
                    log.writeLog("error","Access Denied UserName is :",username);
                    res.send("Access Denied");
                }else{
                    let username = fetch["username"],
                        password = fetch["password"];


                    log.writeLog(Types[0],"Login UserName is : ", username);

                    res.render('well',{
                        title: "WellCome To in Page",
                        tit1 : "Your UserName Is : ",
                        tit2 : "Your Password Is : ",
                        userName : username,
                        password : password
                    });// render well page

                }
            });// check.checkCollection
        }else{
            log.writeLog(Types[1],"UserName OR Password is Null",username);
            res.send("UserName OR Password is Null");

        }//else
    });// check.checkNull
});// router post well page







export const index: Router = router;