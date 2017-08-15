var express = require('express');// add Express in nodejs
var router = express.Router();
var bodyParser = require('body-parser');// call body-parser in  my project
var session = require('express-session');
var mongodb = require('mongodb');

router.use(bodyParser.urlencoded({ extended: true }));

router.use(session({
    secret:'adscfsv555fvf5dv',
    resave : false,
    saveUninitialized: true
}));


////////////////////////////////////////////////////////START VASH//////////////////////////////////////////////////////

router.get('/login', function (req, res) {// Insert value in Dynamic parameters in login page
    res.render('login', {
        title: 'LOGIN FORM (vash)',
        lab1: 'UserName : ',
        lab2: 'Password : '


    });
});



<<<<<<< HEAD
router.get('/well',function(req, res){///////////////////////// CHECK FOR SESSION SET ////////////
    if(!req.session.username){
        res.redirect('./login');
    }else{
        res.redirect('well');
=======
});
 router.post('/well',function(req,res){// Insert value in Dynamic parameters in well page and post value from login page for well page
    var userSession = req.session;
     userSession.username =  req.body.username;
    if(userSession.username == 'milad'){
        res.render('well',{
            title:"Well Come in Page ",
            tit1:"Your UserName is  : ",
            tit2:"Your Password is : ",
            tit3:"Your Session is : ",
            username:req.body.username,
            password:req.body.pass,
            session: userSession.username
        });
    }else{// check for session dont asign session of value to milad
        console.log('faild login');
>>>>>>> 66aa3b9c137c32d7e52bdfa3952f1afc65059391
    }
});


 router.post('/well',function(req,res){// Insert value in Dynamic parameters in well page and post value from login page for well page
    var userSession = req.session;
    var username = req.body.username;
    var password = req.body.password;
    var url = "mongodb://127.0.0.1:27017/test";
    mongodb.connect(url,function(err,db){
        if(err){
            console.log("Unable connecting to MangoDb");
        }else{
            var collection = db.collection("milad");
            collection.findOne({'username' : username , 'password': password}, function(err, fetch){
               //
                if(!fetch){
                    //res.redirect('./login');
                    res.send('Accesses Denie');
                }else {
                    userSession.username = fetch['username'];// session set value

                            res.render('well',{
                                title:"Well Come in Page ",
                                tit1:"Your Name is  : ",
                                tit2:"Your Family Name is : ",
                                tit3:"Your UserName is : ",
                                name: fetch['name'],
                                last_name: fetch['last_name'],
                                username: fetch['username']
                            });

                }//else
            });//findOne
            db.close();
        }
    });
 });




 router.post('/login',function (req, res ) {////// SESSION DESTROY///

   var out =  req.session.destroy();
     res.redirect('login');
<<<<<<< HEAD
        if(out){
            console.log('destroy session');
        }else{
            console.log('session is set');
        }
=======
    if(out){ // if for check destroy session
        console.log('Destroy session')
    }else{
        console.log(' dont destroy session')
    }
>>>>>>> 66aa3b9c137c32d7e52bdfa3952f1afc65059391
 });

///////////////////////////////////////////////////////END VASH/////////////////////////////////////////////////////////



module.exports = router;
