angular.module('UserApp').controller(
    'UserPopupCtrl',
    ['$scope', 'UserPopup',
        function ($scope, UserPopup) {

            $scope.popup = UserPopup;
        }
    ]
);

angular.module('UserApp').controller(
    'LoginFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, handler) {

            $scope.form = new AngForm(['email', 'password'], handler.callback, $http);
        }
    ]
);

angular.module('UserApp').controller(
    'RegisterFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, handler) {

            $scope.form = new AngForm(['email'], handler.callback, $http);
        }
    ]
);

angular.module('UserApp').controller(
    'ForgotFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            $scope.form = new AngForm(['email'], undefined, $http);
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordResetFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            var replace = function (data) {
                location.replace(data['redirect']);
            };

            $scope.form = new AngForm(['new_password'], replace, $http);
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordChangeFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            $scope.form = new AngForm(['old_password', 'new_password'], undefined, $http);
        }
    ]
);

angular.module('UserApp').controller(
    'SignCtrl',
    ['$scope', 'UserHandler', 'UserPopup',
        function ($scope, UserHandler, UserPopup) {

            $scope.login = UserPopup.showLogin;
            $scope.logout = UserHandler.logout;
        }
    ]
);