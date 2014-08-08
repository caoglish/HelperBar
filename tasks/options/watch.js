module.exports = {
  options: {
    livereload: true,
  },
  scripts: {
    files: ['src/*.js'],
    //tasks: ['jshint', 'concat', 'uglify'],
    // tasks: [ 'jshint','browserify'],
    tasks: [ 'jshint','browserify:dist' , 'uglify'],
    options: {
      spawn: false,
    }
  },

  srcModuleUnitTest: {
    files: ['SrcModuleUnitTest/src/**/*.js'],
    tasks: [ 'browserify:moduleUnitTest' ],
    options: {
      spawn: false,
    }
  },



  // css: {
  //   files: ['src/*.less'],
  //   //tasks: ['less', 'autoprefixer', 'cssmin'],
  //   tasks: ['less'],
  //   options: {
  //     spawn: false,
  //   }
  // },
  // images: {
  //   files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
  //   tasks: ['imagemin'],
  //   options: {
  //     spawn: false,
  //   }
  // },
  // html:{
  //   files: ['./**/*.html'],
  //   tasks: [],
  //   options: {
  //     spawn: false
  //   }
  // }
}