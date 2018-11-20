module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.initConfig({

    clean: ["dist"],
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['src/**/lib/**'],
      },
      src: ['Gruntfile.js', 'src/**/*.js'],
    },
    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      img_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['img/*'],
        dest: 'dist/src/'
      },
      pluginDef: {
        expand: true,
        src: [ 'plugin.json', 'README.md' ],
        dest: 'dist',
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ["env"],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['jshint', 'clean', 'copy:src_to_dist', 'copy:img_to_dist', 'copy:pluginDef', 'babel']);
};
