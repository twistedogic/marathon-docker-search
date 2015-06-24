var gulp = require('gulp'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha');

// var options = {
//     port:3001,
//     host:"0.0.0.0",
//     basePath:"./reports",
//     reloadPage:"coverage.html"
// }

gulp.task('test',function(){
    return gulp.src('./test/*.js',{read:false})
    .pipe(mocha({reporter: 'nyan'}))
    .on('error', gutil.log);
})

gulp.task('watch',function(){
    gulp.watch(['./lib/**','./test/**'],['test'])
})

gulp.task('default',['test']);