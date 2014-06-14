angular.module('UserApp', ['ngSanitize']);

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
angular.module('UserApp').factory(
    'UserPopup', function () {

        return (function () {
            // состояния попапа (список форм для отображения)
            var states = {
                LOGIN: 0,
                REGISTER: 1,
                FORGOT: 2,
                CHANGE: 3
            };
            var current_state = states.LOGIN;
            var elem = $('#user-popup-modal');

            var is_active = function (state) {
                return state === current_state;
            };

            // переключение на соответствующую фкладку(форму)
            var show = function (state) {
                if (!is_open()) {
                    elem.modal();
                }
                current_state = state;
            };
            var hide = function () {
                elem.modal('hide');
            };

            var is_open = function () {
                return elem.is(":visible");
            };
            return {
                states: states,
                is_active: is_active,
                showLogin: function () {
                    show(states.LOGIN);
                },
                showRegister: function () {
                    show(states.REGISTER);
                },
                showForgot: function () {
                    show(states.FORGOT);
                },
                showChange: function () {
                    show(states.CHANGE);
                },
                hide: hide
            }
        })();
    }
);

angular.module('UserApp').factory(
    'UserHandler', ['$http', '$q', 'UserPopup',
        function ($http, $q, popup) {

            // проверка авторизован ли пользователь
            var is_auth = function () {
                var deferred = $q.defer();

                $http.get(window.check_user_auth_url).
                    success(function (data, status, headers, config) {
                        if (data['auth'] === true) {
                            deferred.resolve(true);
                        } else {
                            deferred.resolve(false);
                        }
                    }).
                    error(function (data, status, headers, config) {
                        deferred.reject('--error--');
                    });

                return deferred.promise;
            };

            // функция вызываемая после авторизации
            var _callback;
            var callback = function (data) {
                var redirect = data['redirect'];

                if (typeof _callback == 'function') {
                    popup.hide();
                    _callback();
                    _callback = undefined;
                } else if (!redirect) {
                    location.reload();
                } else {
                    location.replace(redirect);
                }
            };

            // показ модального окна авторизации
            var login = function (func) {
                if (func) {
                    _callback = func;
                }
                popup.showLogin();
            };

            var logout = function (url) {
                location.replace(url);
            };

            return {
                login: login,
                logout: logout,
                is_auth: is_auth,
                callback: callback
            };
        }
    ]
);