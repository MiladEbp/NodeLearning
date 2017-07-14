var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));


////////////////////////////////////////////////////////START VASH//////////////////////////////////////////////////////

router.get('/login', function (req, res) {

    res.render('login', {
        title: 'LOGIN FORM (vash)',
        lab1:'UserName : ',
        lab2:'Password : '
    });

});
 router.post('/well',function(req,res){
     res.render('well',{
         title:"Well Come in Page ",
         tit1:"Your UserName is  : ",
         tit2:"Your Password is : ",
         username:req.body.username,
         password:req.body.pass

     });

 });

 router.post('/login',function (req, res) {
     res.redirect('login');
 });

///////////////////////////////////////////////////////END VASH/////////////////////////////////////////////////////////



module.exports = router;
