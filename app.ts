import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import {index} from './routes/index';

let app = express();


app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'vash');


app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use("/", index);


// app.use(function(err,req, res, next){
//
//     res.status(err.status||404);
//     next(new Error('File not found'));
// });
//
//
// app.use(function(err,req,res,next){
//     res.locals.message = err.massage;
//     res.locals.error = req.app.get('env') === 'development'? err:{};
//     res.status(err.status||500);
//     res.render('error');
// });


// app.get('/',function(req, res){
//     res.send("Heloo");
// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})


module.exports = app;
