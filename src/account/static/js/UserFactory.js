angular.module('UserApp').factory(
    'UserHandler', ['$http', '$q', 'Cookies',
        function ($http, $q, Cookies) {

            var enter_popup = (function () {
                var loginOpen = true;

                var loginSelect = function () {
                    return loginOpen;
                };
                var showLogin = function () {
                    if (!popup_is_open()) {
                        $('#user-popup-modal').modal();
                    }
                    loginOpen = true;
                };
                var showRegister = function () {
                    if (!popup_is_open()) {
                        $('#user-popup-modal').modal();
                    }
                    loginOpen = false;
                };
                var popup_is_open = function () {
                    return $('#user-popup-modal').is(":visible");
                };
                var hide = function () {
                    $('#user-popup-modal').modal('hide');
                };
                return {
                    loginSelect: loginSelect,
                    showLogin: showLogin,
                    showRegister: showRegister,
                    hide: hide
                }
            })();

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
                    enter_popup.hide();
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
                enter_popup.showLogin();
            };

            var logout = function (url) {
                location.replace(url);
            };

            var send_login_form = function (url, formData) {

                var loading = Ladda.create(document.querySelector('.btn-submit-login'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                $http.post(url, $.param(formData))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            callback(data['redirect']);
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

            var send_register_form = function (url, formData) {

                var loading = Ladda.create(document.querySelector('.btn-submit-register'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookies.getCookie('csrftoken');

                $http.post(url, $.param(formData))
                    .success(function (data, status, headers, config) {
                        if (data['success'] === true) {
                            callback(data['redirect']);
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

            return {
                login: login,
                logout: logout,
                is_auth: is_auth,
                callback: callback,
                send_login_form: send_login_form,
                send_register_form: send_register_form,
                openLogin: enter_popup.showLogin,
                loginSelect: enter_popup.loginSelect,
                openRegister: enter_popup.showRegister
            };
        }
    ]
);