// Обязательная обёртка
module.exports = function (grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            common: {
                src: 'js_src/*.js',
                dest: 'js/common.js'
            },
            account: {
                src: '../account/static/js_src/*.js',
                dest: '../account/static/js/account.js'
            },
            pages: {
                src: '../pages/static/js_src/*.js',
                dest: '../pages/static/js/pages.js'
            },
            libs: {
                src: [
                    'js_src/vendor/*.js',
                    'bootstrap-3.1.1/js/bootstrap.min.js',
                    'ladda/js/spin.min.js',
                    'ladda/js/ladda.min.js'
                ],
                dest: 'js/libs.js'
            },
            ie: {
                src: 'js_src/ie_fix/*.min.js',
                dest: 'js/ie_fix.js'
            }
        },
        // Сжимаем
        uglify: {
            common: {
                files: {
                    'js/common.min.js': '<%= concat.common.dest %>'
                }
            },
            account: {
                files: {
                    '../account/static/js/account.min.js': '<%= concat.account.dest %>'
                }
            },
            pages: {
                files: {
                    '../pages/static/js/pages.min.js': '<%= concat.pages.dest %>'
                }
            }
        },
        // Следим за изменениями
        watch: {
            scripts: {
                files: [
                    'js_src/*.js',
                    '../account/static/js_src/*.js',
                    '../pages/static/js_src/*.js'
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify']);
};