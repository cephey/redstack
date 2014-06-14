// Обязательная обёртка
module.exports = function (grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            common: {
                src: [
                    'js_src/cookies.js',
                    'js_src/loader.js',
                    'js_src/tools.js',
                    'js_src/form.js'
                ],
                dest: 'js/common.js'
            },
            account: {
                src: '../account/static/js/*.js',
                dest: 'js/account.js'
            },
            pages: {
                src: '../pages/static/js/*.js',
                dest: 'js/pages.js'
            },
            libs_js: {
                src: [
                    'js_src/vendor/angular.min.js',
                    'js_src/vendor/angular-sanitize.min.js',
                    'js_src/vendor/jquery-1.11.0.min.js',
                    'bootstrap-3.1.1/js/bootstrap.min.js',
                    'ladda/js/spin.min.js',
                    'ladda/js/ladda.min.js'
                ],
                dest: 'js/libs.js'
            },
            libs_css: {
                src: [
                    'bootstrap-3.1.1/css/bootstrap.min.css',
                    'ladda/css/ladda-themeless.min.css'
                ],
                dest: 'css/libs.css'
            },
            ie: {
                src: 'js_src/ie_fix/*.min.js',
                dest: 'js/ie_fix.js'
            }
        },
        // Сжимаем js
        uglify: {
            common: {
                files: {
                    'js/common.min.js': '<%= concat.common.dest %>'
                }
            },
            account: {
                files: {
                    'js/account.min.js': '<%= concat.account.dest %>'
                }
            },
            pages: {
                files: {
                    'js/pages.min.js': '<%= concat.pages.dest %>'
                }
            }
        },
        // SASS -> CSS
        sass: {
            dist: {
                files: {
                    'css/base.css': 'css_src/base.scss',
                    'css/index.css': 'css_src/index.scss',
                    'css/login.css': 'css_src/login.scss',
                    'css/pattern.css': 'css_src/pattern.scss'
                }
            }
        },
        // Сжимаем css
        cssmin: {
            base: {
                src: 'css/base.css',
                dest: 'css/base.min.css'
            },
            index: {
                src: 'css/index.css',
                dest: 'css/index.min.css'
            },
            login: {
                src: 'css/login.css',
                dest: 'css/login.min.css'
            },
            pattern: {
                src: 'css/pattern.css',
                dest: 'css/pattern.min.css'
            }
        },
        copy: {
            fonts: {
                expand: true,
                cwd: 'bootstrap-3.1.1/fonts/',
                src: '**',
                dest: 'fonts/',
                flatten: true
            }
        },
        // Следим за изменениями
        watch: {
            scripts: {
                files: [
                    'js_src/*.js',
                    '../account/static/js/*.js',
                    '../pages/static/js/*.js'
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'copy']);
};