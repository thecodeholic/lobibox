module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        less : {
            development: {
                files: {
                    'src/css/LobiBox.css': ['src/less/LobiBox.less']
                }
            }
        },
        
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css',
                        src: '<%= pkg.name %>.css',
                        dest: 'dist/css',
                        ext: '.min.css'
                    }
                ]
            }
        },
        
        concat: {
            js: {
                src: ['src/js/messageboxes.js', 'src/js/notifications.js'],
                dest: 'src/js/<%= pkg.name %>.js'
            }
        },
        
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '*.js',
                        dest: 'dist/js'
                    }
                ]
            },
            css: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css',
                        src: '*.css',
                        dest: 'dist/css'
                    }
                ]
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
                        cwd: 'src/js',
                        src: '*.js',
                        dest: 'dist/js',
                        ext: '.min.js'
                    }
                ]
            }
        },
        
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['concat', 'uglify']
            },
            css: {
                files: 'src/less/*.less',
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