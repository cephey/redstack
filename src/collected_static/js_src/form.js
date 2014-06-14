function AngForm(field_list) {

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
        set: function (data) {
            this.message = data ? data['message'] : false
        },
        clear: function () {
            this.set()
        }
    };

    this.loader = new Loader();

    this.errors = (function (field_list) {
        var instance = {
            __all__: false,
            show: function (data) {
                if (data) {
                    var error_dict = data['errors'];
                    for (var field in error_dict) {
                        this[field] = error_dict[field];
                    }
                } else {
                    this.__all__ = ['Ошибка сервера'];
                }
            },
            clear: function () {
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
    })(field_list);
}