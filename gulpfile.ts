import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';

let app = 'app.js';

gulp.task('default', function(){
    nodemon({
       script:app
    })
});