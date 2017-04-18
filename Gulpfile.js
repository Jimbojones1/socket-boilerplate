var gulp        = require('gulp');
var browserSync = require('browser-sync');
var less        = require('gulp-less')
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var watch       = require('gulp-watch');
var fs          = require('fs');
var util        = require('gulp-util');
var str         = require('string-to-stream');

//  first arguement is the files I want to watch, the second is the task to run
gulp.task('watch', function(){
  gulp.watch(['./clientReact/*.js'], ['react'])
  // gulp.watch(['./server/public/styles/*.less'], ['compile-less'])
  // gulp.watch("./server/views/*.html").on('change', browserSync.reload);
})

gulp.task('react', function(){
  return browserify({
            entries: './clientReact/main.js',
            extensions: ['.js'],
            debug: true
          })
          .transform('babelify', {presets: ["react", "es2015"]})
          .bundle()
          .pipe(source('build.js'))
          .pipe(gulp.dest('./public'))
})


gulp.task('comp', () => {
    // Get the name of the file
    // ex. gulp comp --varName '123'
    var fileName = util.env.varName.toString()
    // Write the file then ship it off
      str(CreateReactClass(fileName))
      .pipe(source(fileName + "Component.js"))
      .pipe(gulp.dest('./clientReact'))

})




function CreateReactClass(className){
  var Component = `const React = require("react")

class ${className} extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      someValue: ''
    }
  }
  render(){
    return (

      )
  }
}
  `

  return Component
}
// gulp.task('compile-less', function(){
//   gulp.src('./server/public/styles/main.less')
//   .pipe(less())
//   .pipe(gulp.dest('./server/public/styles'));
// })


gulp.task('default', ['react', 'watch'])
