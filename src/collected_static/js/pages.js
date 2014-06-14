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
    ['$scope', '$http', 'UserHandler', 'PatternHandler',
        function ($scope, $http, UserHandler, PatternHandler) {

            $scope.form = new AngForm(['name', 'pattern']);

            // генерация имени сайта
            $scope.generate_name = function () {
                $scope.form.fields.name = SiteName.generate();
            };

            // инициализация списка css классов картинок
            $scope.build = function (count) {
                return ImageState.get_blurs(count)
            };

            // наведение мыши на картинку / вывод мыши с картинки
            $scope.active = ImageState.active;
            $scope.deactive = ImageState.deactive;

            // клик по картинке шаблона
            $scope.set_img = function (val) {
                ImageState.set_img();
                $scope.form.fields.pattern = val;
            };

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var loader = this.loader;

                errors.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            UserHandler.callback(data)
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        if (status === 401) {
                            UserHandler.login(function () {
                                $scope.form.submit(url);
                            })
                        } else {
                            errors.show();
                        }
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
        }
    ]
);
//angular.module('PatternApp').factory(
//    'ImageState', function () {
//
//
//    }
//);

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