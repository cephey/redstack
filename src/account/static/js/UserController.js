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

            $scope.form = new AngForm(['email', 'password']);

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var loader = this.loader;

                errors.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            handler.callback(data)
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        errors.show();
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'RegisterFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, handler) {

            $scope.form = new AngForm(['email']);

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var loader = this.loader;

                errors.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            handler.callback(data)
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        errors.show();
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'ForgotFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            $scope.form = new AngForm(['email']);

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var success = this.success;
                var loader = this.loader;

                errors.clear();
                success.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            success.set(data);
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        errors.show();
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordResetFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            $scope.form = new AngForm(['new_password']);

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var loader = this.loader;

                errors.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            location.replace(data['redirect']);
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        errors.show();
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
        }
    ]
);

angular.module('UserApp').controller(
    'PasswordChangeFormCtrl',
    ['$scope', '$http',
        function ($scope, $http) {

            $scope.form = new AngForm(['old_password', 'new_password']);

            $scope.form.submit = function (url) {
                var errors = this.errors;
                var success = this.success;
                var loader = this.loader;

                errors.clear();
                success.clear();
                loader.show();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(this.fields))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            success.set(data);
                        } else {
                            errors.show(data);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        errors.show();
                    })
                    .finally(function () {
                        loader.hide();
                    });
            };
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