module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        less : {
            development: {
                files: {
                    'css/<%= pkg.name %>.css': ['less/<%= pkg.name %>.less']
                }
            }
        },
        
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: '<%= pkg.name %>.css',
                        dest: 'dist/css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        
        concat: {
            js: {
                src: ['js/messageboxes.js', 'js/notifications.js'],
                dest: 'js/<%= pkg.name %>.js'
            }
        },
        
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '*.js',
                        dest: 'dist/js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: '*.css',
                        dest: 'dist/css'
                    }
                ]
            },
            sounds: {
                expand: true,
                cwd: 'sounds',
                src: '*',
                dest: 'dist/sounds'
            }
        },
        
        uglify: {
            options: {
                mangle: false
            },
            my_target : {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        src: '*.js',
                        dest: 'dist/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'copy:js', 'uglify']
            },
            css: {
                files: 'less/*.less',
                tasks: ['less', 'cssmin', 'copy:css']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'copy', 'uglify', 'watch']);
};