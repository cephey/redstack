angular.module('PatternApp', ['UserApp']);

angular.module('PatternApp').config(
    ['$interpolateProvider', '$httpProvider',
        function ($interpolateProvider, $httpProvider) {

            /* задаю маркеры шаблонизатора */
            $interpolateProvider.startSymbol('[%');
            $interpolateProvider.endSymbol('%]');

            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        }
    ]
);
angular.module('PatternApp').controller(
    'PatternFormCtrl',
    ['$scope', '$http', 'NameGenerator', 'ImageState', 'UserHandler', 'PatternHandler',
        function ($scope, $http, NameGenerator, ImageState, UserHandler, PatternHandler) {

            // данные формы
            $scope.formData = {};

            // генерация имени сайта
            $scope.generate_name = function () {
                $scope.formData.site_name = NameGenerator.generate_site_name();
            };

            // TODO: как то получить количество картинок из шаблона
            $scope.img_count = 3;

            // список css классов картинок
            $scope.blurs = ImageState.get_blurs($scope.img_count);

            // наведение мыши на картинку / вывод мыши с картинки
            $scope.active = ImageState.active;
            $scope.deactive = ImageState.deactive;

            // клик по картинке шаблона
            $scope.set_img = function (val) {
                ImageState.set_img();
                $scope.formData.site_template = val;
            };

            // сабмит формы
            $scope.submit = function (url) {
                UserHandler.is_auth().then(function (is_auth) {
                    if (is_auth === true) {
                        PatternHandler.send_pattern_form(url, $scope.formData);
                    } else {
                        UserHandler.login(function () {
                            PatternHandler.send_pattern_form(url, $scope.formData)
                        });
                    }
                });
            };
        }
    ]
);
angular.module('PatternApp').factory(
    'NameGenerator', function () {

        var colors = ['aqua', 'gray', 'navy', 'silver', 'black',
                'green', 'olive', 'teal', 'blue', 'lime', 'purple',
                'white', 'fuchsia', 'maroon', 'red', 'yellow'],
            c_len = colors.length,
            words = ['car', 'house', 'sky', 'sun', 'tree', 'road',
                'pen', 'water', 'paper', 'book', 'ship'],
            w_len = words.length;

        // генерация имени сайта
        var generate_site_name = function () {
            var i = Math.floor(Math.random() * c_len),
                color = colors[i],
                j = Math.floor(Math.random() * w_len),
                word = words[j],
                number = Math.floor(Math.random() * 1000);

            return color + '-' + word + '-' + number;
        };

        return {
            generate_site_name: generate_site_name
        };
    }
);

angular.module('PatternApp').factory(
    'ImageState', function () {

        // список заданой длины со значениями по умолчанию
        var default_list = function (count, func) {
            var result = new Array(count);
            for (var i = 0; i < count; i++) {
                result[i] = func(i);
            }
            return result;
        };

        var picture,
            blurs,
            N = '',
            Y = 'blur';

        var get_blurs = function (count) {
            blurs = default_list(count, function (i) {
                return '';
            });
            picture = default_list(count, function (i) {
                return 1;
            });
            return blurs;
        };

        // список css классов картинок
        var blur = function () {
            picture.forEach(function (elem, i) {
                blurs[i] = ({ 1: N, 2: Y, 4: N, 5: Y, 6: N })[elem];
            });
        };

        // срабатывает когда мышь наводится на картинку
        var active = function (ind) {
            picture.forEach(function (elem, i) {
                picture[i] = ({ 1: (i === ind) ? 1 : 2, 4: 4, 5: (i === ind) ? 6 : 5 })[elem];
            });
            blur();
        };

        // срабатывает, когда мышь покидает картинку
        var deactive = function () {
            picture.forEach(function (elem, i) {
                picture[i] = ({ 1: 1, 2: 1, 4: 4, 5: 5, 6: 5 })[elem];
            });
            blur();
        };

        // клик по картинке
        var set_img = function () {
            picture.forEach(function (elem, i) {
                picture[i] = ({ 1: 4, 2: 5, 4: 5, 5: 5, 6: 4 })[elem];
            });
            blur();
        };

        return {
            get_blurs: get_blurs,
            active: active,
            deactive: deactive,
            set_img: set_img
        };
    }
);

angular.module('PatternApp').factory(
    'PatternHandler', ['$http',
        function ($http) {

            var send_pattern_form = function (url, formData) {

                var loading = Ladda.create(document.querySelector('.btn-submit-pattern'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(formData))
                    .success(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .then(function () {
                        loading.stop();
                    });
            };

            return {
                send_pattern_form: send_pattern_form
            };
        }
    ]
);