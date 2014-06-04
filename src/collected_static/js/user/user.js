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
    'UserPopupCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

            $scope.loginSelect = UserHandler.loginSelect;

        }
    ]
);

angular.module('UserApp').controller(
    'LoginFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

            $scope.formData = {};

            $scope.openRegister = UserHandler.openRegister;

            $scope.submit = function (url) {
                UserHandler.send_login_form(url, $scope.formData);
            };
        }
    ]
);

angular.module('UserApp').controller(
    'RegisterFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

            $scope.formData = {};

            $scope.openLogin = UserHandler.openLogin;

            $scope.submit = function (url) {
                UserHandler.send_register_form(url, $scope.formData);
            };
        }
    ]
);

angular.module('UserApp').controller(
    'SignCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

            $scope.login = UserHandler.login;
            $scope.logout = UserHandler.logout;
        }
    ]
);