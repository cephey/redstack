angular.module('UserApp', ['Cookies', 'ngSanitize']);

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
    'LoginForm', ['$http', 'Cookies', 'UserHandler',
        function ($http, Cookies, handler) {

            return (function () {
                var fields = {
                    username: '',
                    password: ''
                };
                var errors = {
                    username: false,
                    password: false,
                    __all__: false
                };
                var clear_errors = function () {
                    for (var i in errors) {
                        errors[i] = false;
                    }
                };
                var submit_selector = 'btn-submit-login';
                var show_errors = function (error_dict) {
                    if (error_dict) {
                        for (var field in error_dict) {
                            errors[field] = error_dict[field];
                        }
                    } else {
                        errors.__all__ = ['Ошибка сервера'];
                    }
                };
                var submit = function (url) {
                    clear_errors();

                    var loading = Ladda.create(document.querySelector('.' + submit_selector));
                    loading.start();

                    $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                    $http.post(url, $.param(fields))
                        .success(function (data, status, headers, config) {
                            if (data['success'] === true) {
                                handler.callback(data['redirect']);
                            } else {
                                show_errors(data['errors']);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            show_errors();
                        })
                        .finally(function () {
                            loading.stop();
                        });
                };
                return {
                    fields: fields,
                    errors: errors,
                    show_errors: show_errors,
                    clear_errors: clear_errors,
                    submit: submit,
                    btnSubmitSelector: submit_selector
                }
            })();
        }
    ]
);

angular.module('UserApp').factory(
    'RegisterForm', ['$http', 'Cookies', 'UserHandler',
        function ($http, Cookies, handler) {

            return (function () {
                var fields = {
                    email: ''
                };
                var errors = {
                    email: false,
                    __all__: false
                };
                var clear_errors = function () {
                    for (var i in errors) {
                        errors[i] = false;
                    }
                };
                var submit_selector = 'btn-submit-register';
                var show_errors = function (error_dict) {
                    if (error_dict) {
                        for (var field in error_dict) {
                            errors[field] = error_dict[field];
                        }
                    } else {
                        errors.__all__ = ['Ошибка сервера'];
                    }
                };
                var submit = function (url) {
                    clear_errors();

                    var loading = Ladda.create(document.querySelector('.' + submit_selector));
                    loading.start();

                    $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                    $http.post(url, $.param(fields))
                        .success(function (data, status, headers, config) {
                            if (data['success'] === true) {
                                handler.callback(data['redirect']);
                            } else {
                                show_errors(data['errors']);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            show_errors();
                        })
                        .finally(function () {
                            loading.stop();
                        });
                };
                return {
                    fields: fields,
                    errors: errors,
                    show_errors: show_errors,
                    clear_errors: clear_errors,
                    submit: submit,
                    btnSubmitSelector: submit_selector
                }
            })();
        }
    ]
);

angular.module('UserApp').factory(
    'ForgotForm', ['$http', '$q', 'Cookies',
        function ($http, $q, Cookies) {

            return (function () {
                var fields = {
                    email: ''
                };
                var errors = {
                    email: false,
                    __all__: false
                };
                var success_message = (function () {
                    var message = false;
                    var get = function () {
                        return message;
                    };
                    var set = function (value) {
                        message = value || false;
                    };
                    return {
                        get: get,
                        set: set,
                        clear: function () {
                            set()
                        }
                    };
                })();

                var clear_errors = function () {
                    success_message.clear();
                    for (var i in errors) {
                        errors[i] = false;
                    }
                };
                var submit_selector = 'btn-submit-forgot';
                var show_errors = function (error_dict) {
                    if (error_dict) {
                        for (var field in error_dict) {
                            errors[field] = error_dict[field];
                        }
                    } else {
                        errors.__all__ = ['Ошибка сервера'];
                    }
                };
                var submit = function (url) {
                    clear_errors();

                    var loading = Ladda.create(document.querySelector('.' + submit_selector));
                    loading.start();

                    $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                    $http.post(url, $.param(fields))
                        .success(function (data, status, headers, config) {
                            if (data['success'] === true) {
                                success_message.set(data['message']);
                            } else {
                                show_errors(data['errors']);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            show_errors();
                        })
                        .finally(function () {
                            loading.stop();
                        });
                };
                return {
                    fields: fields,
                    errors: errors,
                    show_errors: show_errors,
                    clear_errors: clear_errors,
                    submit: submit,
                    btnSubmitSelector: submit_selector,
                    success_message: success_message.get
                }
            })();
        }
    ]
);

angular.module('UserApp').factory(
    'PasswordResetForm', ['$http', 'Cookies',
        function ($http, Cookies) {

            return (function () {
                var fields = {
                    new_password: ''
                };
                var errors = {
                    new_password: false,
                    __all__: false
                };
                var clear_errors = function () {
                    for (var i in errors) {
                        errors[i] = false;
                    }
                };
                var submit_selector = 'btn-submit-password-reset';
                var show_errors = function (error_dict) {
                    if (error_dict) {
                        for (var field in error_dict) {
                            errors[field] = error_dict[field];
                        }
                    } else {
                        errors.__all__ = ['Ошибка сервера'];
                    }
                };
                var submit = function (url) {
                    clear_errors();

                    var loading = Ladda.create(document.querySelector('.' + submit_selector));
                    loading.start();

                    $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                    $http.post(url, $.param(fields))
                        .success(function (data, status, headers, config) {
                            if (data['success'] === true) {
                                location.replace(data['redirect']);
                            } else {
                                show_errors(data['errors']);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            show_errors();
                        })
                        .finally(function () {
                            loading.stop();
                        });
                };
                return {
                    fields: fields,
                    errors: errors,
                    show_errors: show_errors,
                    clear_errors: clear_errors,
                    submit: submit,
                    btnSubmitSelector: submit_selector
                }
            })();
        }
    ]
);

angular.module('UserApp').factory(
    'PasswordChangeForm', ['$http', 'Cookies',
        function ($http, Cookies) {

            return (function () {
                var fields = {
                    old_password: '',
                    new_password: ''
                };
                var errors = {
                    old_password: false,
                    new_password: false,
                    __all__: false
                };
                var success_message = (function () {
                    var message = false;
                    var get = function () {
                        return message;
                    };
                    var set = function (value) {
                        message = value || false;
                    };
                    return {
                        get: get,
                        set: set,
                        clear: function () {
                            set()
                        }
                    };
                })();

                var clear_errors = function () {
                    success_message.clear();
                    for (var i in errors) {
                        errors[i] = false;
                    }
                };
                var submit_selector = 'btn-submit-password-change';
                var show_errors = function (error_dict) {
                    if (error_dict) {
                        for (var field in error_dict) {
                            errors[field] = error_dict[field];
                        }
                    } else {
                        errors.__all__ = ['Ошибка сервера'];
                    }
                };
                var submit = function (url) {
                    clear_errors();

                    var loading = Ladda.create(document.querySelector('.' + submit_selector));
                    loading.start();

                    $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                    $http.post(url, $.param(fields))
                        .success(function (data, status, headers, config) {
                            if (data['success'] === true) {
                                success_message.set(data['message']);
                            } else {
                                show_errors(data['errors']);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            show_errors();
                        })
                        .finally(function () {
                            loading.stop();
                        });
                };
                return {
                    fields: fields,
                    errors: errors,
                    show_errors: show_errors,
                    clear_errors: clear_errors,
                    submit: submit,
                    btnSubmitSelector: submit_selector,
                    success_message: success_message.get
                }
            })();
        }
    ]
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
            var callback = function (redirect) {
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