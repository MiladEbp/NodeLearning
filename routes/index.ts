import * as bodyParser from 'body-parser';
import {Check} from '../bl/check-class';
import {Router} from 'express';
import {WinstonLog} from '../lib/log-class';

const router: Router = Router();
let check = new Check(),
    log = new  WinstonLog();

router.use(bodyParser.urlencoded({ extended: false }));



router.get("/login", function(req, res){


    log.writeLog("info","Logout UserName is :","Null");
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

                    log.writeLog("info","Login UserName is : ", username);

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
            log.writeLog("error","UserName OR Password is Null",username);
            res.send("UserName OR Password is Null");

        }//else
    });// check.checkNull
});// router post well page







export const index: Router = router;