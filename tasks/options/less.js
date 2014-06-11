module.exports = {
  dist: {
    options: {
      // cssmin will minify later
      style: 'expanded'
    },
    files: {
      'dist/style.css': 'src/css/main.less'
    }
  }
}