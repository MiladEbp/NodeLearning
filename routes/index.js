var express = require('express');// add Express in nodejs
var router = express.Router();
var bodyParser = require('body-parser');// call body-parser in  my project
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////START VASH//////////////////////////////////////////////////////

router.get('/login', function (req, res) {// Insert value in Dynamic parameters in login page

    res.render('login', {
        title: 'LOGIN FORM (vash)',
        lab1:'UserName : ',
        lab2:'Password : '
    });

});
 router.post('/well',function(req,res){// Insert value in Dynamic parameters in well page and post value from login page for well page
     res.render('well',{
         title:"Well Come in Page ",
         tit1:"Your UserName is  : ",
         tit2:"Your Password is : ",
         username:req.body.username,
         password:req.body.pass

     });

 });

 router.post('/login',function (req, res) {// return respond
     res.redirect('login');
 });

///////////////////////////////////////////////////////END VASH/////////////////////////////////////////////////////////



module.exports = router;
