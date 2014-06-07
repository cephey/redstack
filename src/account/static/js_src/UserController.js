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
    ['$scope', 'LoginForm',
        function ($scope, LoginForm) {

            $scope.form = LoginForm;
        }
    ]
);

angular.module('UserApp').controller(
    'RegisterFormCtrl',
    ['$scope', 'RegisterForm',
        function ($scope, RegisterForm) {

            $scope.form = RegisterForm;
        }
    ]
);

angular.module('UserApp').controller(
    'ForgotFormCtrl',
    ['$scope', 'ForgotForm',
        function ($scope, ForgotForm) {

            $scope.form = ForgotForm;
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordResetFormCtrl',
    ['$scope', 'PasswordResetForm',
        function ($scope, PasswordResetForm) {

            $scope.form = PasswordResetForm;
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordChangeFormCtrl',
    ['$scope', 'PasswordChangeForm',
        function ($scope, PasswordChangeForm) {

            $scope.form = PasswordChangeForm;
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