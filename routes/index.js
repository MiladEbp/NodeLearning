var express = require('express');// add Express in nodejs
var router = express.Router();
var bodyParser = require('body-parser');// call body-parser in  my project
var session = require('express-session');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret:'bbbbb'
}));

////////////////////////////////////////////////////////START VASH//////////////////////////////////////////////////////

router.get('/login', function (req, res) {// Insert value in Dynamic parameters in login page


    res.render('login', {
        title: 'LOGIN FORM (vash)',
        lab1:'UserName : ',
        lab2:'Password : '
    });



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
    }else{
        console.log('faild login');
    }





 });

 router.post('/login',function (req, res) {// return respond

    var out = req.session.destroy();
     res.redirect('login');
    if(out){
        console.log('Destroy session')
    }else{
        console.log(' dont destroy session')
    }
 });

///////////////////////////////////////////////////////END VASH/////////////////////////////////////////////////////////



module.exports = router;
