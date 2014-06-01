angular.module('UserApp').factory(
    'UserHandler', ['$http', '$q', function ($http, $q) {

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
                $('#login-modal').modal('hide');
                _callback();
                _callback = undefined;
            } else if (!redirect) {
                location.reload();
            } else {
                location.replace(redirect);
            }
        };

        // показ модального окна авторизации
        var show_login_form = function (func) {
            _callback = func;
            $('#login-modal').modal();
        };

        return {
            is_auth: is_auth,
            show_login_form: show_login_form,
            callback: callback
        };
    }]
);