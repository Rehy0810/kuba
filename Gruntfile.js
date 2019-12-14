/*global module:false*/
module.exports = function (grunt) {
    var cssFiles = [
        "www/css/style.css",
    ];
    var jsFiles = [
        "www/js/main.js",
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dev: {
                files: {
                    'www/css/style.css': 'www/css/style.scss',
                }
            },
        },
        watch: {
            sass: {
                files: ['www/css/**/*.scss'],
                tasks: ['sass:dev'],
                options: {
                    spawn: false
                }
            }
        }
    });
    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-uglify-es');
    //grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    //grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['sass:dev', 'concat', 'uglify', 'cssmin:dist']);

};