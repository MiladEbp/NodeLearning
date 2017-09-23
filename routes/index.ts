import * as bodyParser from 'body-parser';
import {Check} from '../bl/check-class';
import {Router} from 'express';
import {winstonLog} from '../lib/log-class';

const router: Router = Router();
let check = new Check(),
    log = new  winstonLog();

router.use(bodyParser.urlencoded({ extended: false }));



router.get("/login", function(req, res){


    log.writeLog("Logout UserName is :","Null");
    res.render('login',{
        title: 'LOGIN FORM(vash)',
        lab1: 'UserName',
        lab2:'Password'
    });
});// router get Login page


router.post("/well", function(req, res){
    let username = req.body.username,
        password = req.body.password;

    check.checkNull(username, password, function(result){
        if(result != false){

            check.checkCollection(username, password, function(err, fetch){
                if(err != false){
                    let username = fetch["username"],
                        password = fetch["password"];

                    res.render('well',{
                        title: "WellCome To in Page",
                        tit1 : "Your UserName Is : ",
                        tit2 : "Your Password Is : ",
                        userName : username,
                        password : password
                    });// render well page
                    log.writeLog("Login UserName is : ", username);
                }else{
                    res.send("Access Denied");
                    log.writeLog("Access Denied UserName is :",username);
                }
            });// check.checkCollection
        }else{
            res.send("UserName OR Password is Null");

        }//else
    });// check.checkNull
});// router post well page







export const index: Router = router;