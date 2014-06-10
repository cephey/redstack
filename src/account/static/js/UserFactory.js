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