var express = require('express');// add Express in nodejs
var router = express.Router();
var bodyParser = require('body-parser');// call body-parser in  my project
var session = require('express-session');
var mongoose = require('mongoose'),
    schema = mongoose.Schema;


const
    schemaModel = new schema({name: String , lastName: String, userName: String ,password: String },{collection : "milad" }),
    modelCollection = mongoose.model("milad", schemaModel);

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



router.get('/well',function(req, res){///////////////////////// CHECK FOR SESSION SET ////////////
    if(!req.session.username){
        res.redirect('./login');
    }else{
        res.redirect('well');
    }
});


 router.post('/well',function(req,res){// Insert value in Dynamic parameters in well page and post value from login page for well page
    var userSession = req.session,
        username = req.body.username,
        password = req.body.password,
        url = "mongodb://127.0.0.1:27017/test";
         mongoose.connect(url,{useMongoClient: true}, function(err){
            if(err){
                res.send("No connect Mongodb by Model");
            }else{

                modelCollection.findOne({userName: username , password: password},function(err,fetch){
                    if(err){
                        //res.redirect('./login');
                        res.send('Accesses Denie');
                    }else {
                        userSession.username = fetch['userName'];// session set value

                        res.render('well',{
                            title:"Well Come in Page ",
                            tit1:"Your Name is  : ",
                            tit2:"Your Family Name is : ",
                            tit3:"Your UserName is : ",
                            name: fetch['name'],
                            lastName: fetch['lastName'],
                            userName: fetch['userName']
                        });

                    }//else
                });//findOne

            }//else connect function

        });



 });





 router.post('/login',function (req, res ) {////// SESSION DESTROY///

   var out =  req.session.destroy();
     res.redirect('login');
        if(out){
            console.log('destroy session');
        }else{
            console.log('session is set');
        }
 });

///////////////////////////////////////////////////////END VASH/////////////////////////////////////////////////////////



module.exports = router;
