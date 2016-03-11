module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    grunt.initConfig({
        // Ma za zadanie obserwowanie plikow i wykrywanie zmian, nastepnie odpala zlecone zadania
        watch: {
            options: {
                livereload: 1338,
                spawn: true
            },
            javascript: {
                files: ["public/**/*.js", "routes/*.js", "testowanie/**/*.js"],
                tasks: ["uglify:cel"]
            },
            html: {
                files: ["public/**/*.html"]
            },
            scss: {
                files: ["public/**/*.scss"],
                tasks: ["sass:dist"],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ["public/dist/*.css"],
                tasks: []
            }
        },
        exec: {
            npm_install: 'npm install',
            bower_install: 'bower install'
        },
        uglify: {
            options: {
                mangle: false,
                beautify: true // na koncu zmienic na false aby zaoszczedzic miejsce
            },
            cel: {
                files: {
                    "public/dist/output.js": [
                        "public/modules/mainApp/main.js",
                        "public/modules/userControl/main.js",
                        "public/modules/cms/main.js",
                        "public/modules/mainApp/services/*.js",
                        "public/modules/mainApp/controllers/*.js",
                        "public/modules/userControl/services/*.js",
                        "public/modules/cms/controllers/*.js",
                        "public/modules/cms/services/*.js"
                    ]
                }
            },
            biblioteki: {
                files: {
                    "public/dist/libs.js": [
                        "node_modules/jquery/dist/jquery.js",
                        "node_modules/angular/angular.min.js",
                        "node_modules/angular-mocks/angular-mocks.js",
                        "node_modules/angular-ui-router/release/angular-ui-router.min.js",
                        "bower_components/angular-material/angular-material.js",
                        "bower_components/angular-aria/angular-aria.js",
                        "bower_components/angular-animate/angular-animate.js",
                        "bower_components/angular-messages/angular-messages.js",
                        "node_modules/bcryptjs/dist/bcrypt.min.js",
                        "node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "node_modules/crypto-js/crypto-js.js",
                        "node_modules/angular-img-fallback/angular.dcb-img-fallback.min.js",
                        "node_modules/oclazyload/dist/ocLazyLoad.min.js",
                        "node_modules/angular-file-upload/dist/angular-file-upload.js",
                        "node_modules/socket.io/node_modules/socket.io-client/socket.io.js",
                        "node_modules/sweetalert/dist/sweetalert-dev.js",
                        "node_modules/angular-local-storage/dist/angular-local-storage.min.js",
                        "node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js"
                    ]
                }
            }
        },
        cssmin: {
            options: {},
            libs: {
                files: {
                    "public/dist/libs.css": [
                        "node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "node_modules/bootstrap/dist/css/bootstrap.min.css.map",
                        "node_modules/sweetalert/dist/sweetalert.css",
                        "node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css",
                        "bower_components/angular-material/angular-material.min.css",
                        "bower_components/angular-material/angular-material.layouts.min.css",
                    ]
                }
            },
            project: {
                files: {
                    "public/dist/output.css": ["public/dist/tmp/**/*.css"]
                }
            }
        },
        clean: {
            dist: {
                src: ["public/dist"]
            }
        },
        concurrent: {
            target1: {
                tasks: ["nodemon", 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        nodemon: {
            dev: {
                //script: 'bin/www',
                script: 'server.js',
                options: {
                    ignore: ['public', 'node_modules', 'bower_components', 'nbproject', 'testowanie']
                }
            }
        },
        karma: {
            //continuous integration mode: run tests once in PhantomJS browser.
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded',
                    quiet: true,
                    lineNumbers: true
                },
                //files: {                         // Dictionary of files
                //    'public/dist/output.css': 'public/modules/mainApp/css/test.scss',       // 'destination': 'source'
                //}
                files: [{
                    expand: true,
                    src: ['public/**/*.scss','!*.css'],
                    dest: 'public/dist/tmp',
                    ext: '.css'
                }]
            }
        }

    })
    ;
    grunt.registerTask('default', ['compile', 'concurrent:target1']);
    // kompiluje biblioteki
    grunt.registerTask('libs', ['uglify:biblioteki']);
    // czysci dista
    grunt.registerTask('clear', ['clean']);
    grunt.registerTask('install', ['exec:npm_install', 'exec:bower_install']);
    grunt.registerTask('compile', ['clear', 'install', 'uglify', "cssmin", 'compileSass']);
    grunt.registerTask('prepare', ['compile']);
    grunt.registerTask('compileSass', ['sass:dist', "cssmin:project"]);


};