module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
    grunt.initConfig({
        // Ma za zadanie obserwowanie plikow i wykrywanie zmian, nastepnie odpala zlecone zadania
        watch: {
            scripts: {
                files: ["public/**/*.js", "routes/*.js", "public/**/*.html", "public/**/*.css", "testowanie/**/*.js"],
                tasks: ["uglify:cel", "karma:continuous"],
                options: {
                    livereload: 1337,
                    spawn: false
                }
            }
        }, uglify: {
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
                        "node_modules/bcryptjs/dist/bcrypt.min.js",
                        "node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "node_modules/crypto-js/crypto-js.js",
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
            target: {
                files: {
                    "public/dist/output.css": [
                        "node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "node_modules/bootstrap/dist/css/bootstrap.min.css.map",
                        "node_modules/sweetalert/dist/sweetalert.css",
                        "node_modules/angular-ui-bootstrap/ui-bootstrap-csp.css"
                    ]
                }
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
        }
    });
    grunt.registerTask('default', ['concurrent:target1']);
    // kompiluje biblioteki
    grunt.registerTask('libs', ['uglify:biblioteki']);

};