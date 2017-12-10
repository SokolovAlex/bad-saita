var gulp = require('gulp');
var server = require('gulp-express');

gulp.task("server", () => {
    return server.run(['server/app.js']);
});

gulp.task('default', ['start']);