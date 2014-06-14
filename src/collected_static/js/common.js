var Cookie = (function () {
    var getCookie = function (name) {
        var matches = document.cookie.match(
            new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    return {
        getCookie: getCookie
    };
})();
function Loader() {
    this.selector = (function (n) {
        var s = '';
        while (s.length < n) {
            s += Math.random().toString(36).replace(/\d|_/g, '').slice(2, 12);
        }
        return s.substr(0, n);
    })(6);

    this.show = function () {
        this.loading = Ladda.create(document.querySelector('.' + this.selector));
        this.loading.start();
    };

    this.hide = function(){
        this.loading.stop();
    };
}
var SiteName = (function () {
    var colors = ['aqua', 'gray', 'navy', 'silver', 'black',
            'green', 'olive', 'teal', 'blue', 'lime', 'purple',
            'white', 'fuchsia', 'maroon', 'red', 'yellow'],
        c_len = colors.length,
        words = ['car', 'house', 'sky', 'sun', 'tree', 'road',
            'pen', 'water', 'paper', 'book', 'ship'],
        w_len = words.length;

    // генерация имени сайта
    var generate = function () {
        var i = Math.floor(Math.random() * c_len),
            color = colors[i],
            j = Math.floor(Math.random() * w_len),
            word = words[j],
            number = Math.floor(Math.random() * 1000);

        return color + '-' + word + '-' + number;
    };

    return {
        generate: generate
    };
})();

var ImageState = (function () {
    // список заданой длины со значениями по умолчанию
    var default_list = function (count, func) {
        var result = new Array(count);
        for (var i = 0; i < count; i++) {
            result[i] = func(i);
        }
        return result;
    };

    var picture,
        blurs,
        N = '',
        Y = 'blur';

    var get_blurs = function (count) {
        blurs = default_list(count, function (i) {
            return '';
        });
        picture = default_list(count, function (i) {
            return 1;
        });
        return blurs;
    };

    // список css классов картинок
    var blur = function () {
        picture.forEach(function (elem, i) {
            blurs[i] = ({ 1: N, 2: Y, 4: N, 5: Y, 6: N })[elem];
        });
    };

    // срабатывает когда мышь наводится на картинку
    var active = function (ind) {
        picture.forEach(function (elem, i) {
            picture[i] = ({ 1: (i === ind) ? 1 : 2, 4: 4, 5: (i === ind) ? 6 : 5 })[elem];
        });
        blur();
    };

    // срабатывает, когда мышь покидает картинку
    var deactive = function () {
        picture.forEach(function (elem, i) {
            picture[i] = ({ 1: 1, 2: 1, 4: 4, 5: 5, 6: 5 })[elem];
        });
        blur();
    };

    // клик по картинке
    var set_img = function () {
        picture.forEach(function (elem, i) {
            picture[i] = ({ 1: 4, 2: 5, 4: 5, 5: 5, 6: 4 })[elem];
        });
        blur();
    };

    return {
        get_blurs: get_blurs,
        active: active,
        deactive: deactive,
        set_img: set_img
    };
})();
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