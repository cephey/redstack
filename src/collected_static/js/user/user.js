angular.module('UserApp', ['Cookies']);

angular.module('UserApp').config(
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

angular.module('UserApp').controller(
    'LoginFormCtrl',
    ['$scope', '$http', 'UserHandler', 'Cookies',
        function ($scope, $http, UserHandler, Cookies) {

            $scope.formData = {};

            $scope.submit = function () {
                $scope.send_form();
            };

            $scope.register = function () {
                UserHandler.show_register_form();
            };

            // отправка формы
            $scope.send_form = function () {

                var loading = Ladda.create(document.querySelector('.btn-submit-login'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                $http.post($scope.submit_url, $.param($scope.formData))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            UserHandler.callback(data['redirect']);
                        } else {
                            console.log(data['errors']);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .then(function () {
                        loading.stop();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'RegisterFormCtrl',
    ['$scope', '$http', 'UserHandler', 'Cookies',
        function ($scope, $http, UserHandler, Cookies) {

            $scope.formData = {};

            $scope.submit = function () {
                $scope.send_form();
            };

            $scope.login = function () {
                UserHandler.show_login_form();
            };

            // отправка формы
            $scope.send_form = function () {

                var loading = Ladda.create(document.querySelector('.btn-submit-register'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                $http.post($scope.submit_url, $.param($scope.formData))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            UserHandler.callback(data['redirect']);
                        } else {
                            console.log(data['errors']);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .then(function () {
                        loading.stop();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'SignCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

            $scope.login = function () {
                UserHandler.show_login_form();
            };

            $scope.logout = function (url) {
                location.replace(url);
            };
        }
    ]
);