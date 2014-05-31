angular.module('PatternApp', ['UserApp']);

angular.module('PatternApp').config(
    ['$interpolateProvider', '$httpProvider', function ($interpolateProvider, $httpProvider) {

        /* задаю маркеры шаблонизатора */
        $interpolateProvider.startSymbol('[%');
        $interpolateProvider.endSymbol('%]');

        /* заголовки POST запроса для AJAX */
        var csrf = document.querySelector('input[name=csrfmiddlewaretoken]');
        if (csrf) {
            $httpProvider.defaults.headers.post['X-CSRFToken'] = csrf.getAttribute('value');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
    }]
);

angular.module('PatternApp').controller(
    'PatternFormCtrl',
    ['$scope', '$http', 'NameGenerator', 'ImageState', 'UserHandler',
        function ($scope, $http, NameGenerator, ImageState, UserHandler) {

            //---внутренние переменные и функции-------------------------------

            // лоудер на кнопке submit
            var loading = Ladda.create(document.querySelector('.btn-submit'));

            //-----------------------------------------------------------------

            // данные формы
            $scope.formData = {};

            // генерация имени сайта
            $scope.generate_name = function () {
                $scope.formData.site_name = NameGenerator.generate_site_name();
            };

            // TODO: как то получить количество картинок из шаблона
            $scope.img_count = 3;

            $scope.blurs = ImageState.get_blurs($scope.img_count);

            $scope.active = ImageState.active;
            $scope.deactive = ImageState.deactive;

            $scope.set_img = function (val) {
                ImageState.set_img();
                $scope.formData.site_template = val;
            };

            // авторизован ли пользователь
            $scope.user_is_auth = function (success, error) {

                UserHandler;

                $http.get(window.check_user_auth_url).
                    success(function (data, status, headers, config) {
                        if (data['auth'] === true) {
                            success();
                        } else {
                            error();
                        }
                    }).
                    error(function (data, status, headers, config) {
                        error();
                    });
            };

            $scope.submit = function () {

                var success = $scope.send_form,
                    error = $scope.login_popup;

                $scope.user_is_auth(success, error);
            };

            $scope.login_popup = function () {
                $('#login-modal').modal();
            };

            $scope.send_form = function () {

                loading.start();

                $http.post($scope.submit_url, $.param($scope.formData)).
                    success(function (data, status, headers, config) {
                        console.log(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log(data);
                    }).
                    then(function () {
                        loading.stop();
                    });
            };
        }
    ]
);