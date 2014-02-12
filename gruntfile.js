module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'www/js/*.js',
        dest: 'build/app.js'
      }
    },

    less: {
      development: {
        options: {
        },
        files: {
          "www/css/bootstrap.css": "www/less/bootstrap.less",
          "www/css/styles.css": "www/less/styles.less"
        }
      },
      production: {
        options: {
          cleancss: true
        },
        files: {
          "build/styles.css": [
            "www/less/bootstrap.less", 
            "www/less/styles.less"
          ],
        }
      }
    },

    watch: {
      css: {
        files: ['www/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('prod', ['uglify', 'less']);

};