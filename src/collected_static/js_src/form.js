function AngForm(name, field_list, func, $http) {

    this.fields = (function (field_list) {
        var instance = {};
        for (var i in field_list) {
            instance[field_list[i]] = '';
        }
        return instance;
    })(field_list);

    this.success = {
        message: false,
        get: function () {
            return this.message
        },
        set: function (value) {
            this.message = value || false
        },
        clear: function () {
            this.set()
        }
    };

    this.loader = Loader.create(name);

    this.errors = (function (field_list, message) {
        var instance = {
            __all__: false,
            show: function (error_dict) {
                if (error_dict) {
                    for (var field in error_dict) {
                        this[field] = error_dict[field];
                    }
                } else {
                    this.__all__ = ['Ошибка сервера'];
                }
            },
            clear: function () {
                message.clear();
                for (var i in this) {
                    if (typeof this[i] !== 'function') {
                        this[i] = false;
                    }
                }
            }
        };
        for (var i in field_list) {
            instance[field_list[i]] = false;
        }
        return instance;
    })(field_list, this.success);

    this.submit = function (url) {
        var errors = this.errors;
        var success = this.success;
        var loader = this.loader;

        this.errors.clear();
        this.loader.show();

        $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

        $http.post(url, $.param(this.fields))
            .success(function (data, status, headers, config) {
                if (data['success'] === true) {
                    // если func === undefined, значит нам
                    // нужно показать success сообщение
                    if (func === undefined) {
                        success.set(data['message']);
                    } else {
                        // иначе передаю данные в callback функцию
                        func(data);
                    }
                } else {
                    errors.show(data['errors']);
                }
            })
            .error(function (data, status, headers, config) {
                errors.show();
            })
            .finally(function () {
                loader.hide();
            });
    }
}