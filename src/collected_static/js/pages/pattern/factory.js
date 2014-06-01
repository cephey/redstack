angular.module('PatternApp').factory(
    'NameGenerator', function () {

        var colors = ['aqua', 'gray', 'navy', 'silver', 'black',
                'green', 'olive', 'teal', 'blue', 'lime', 'purple',
                'white', 'fuchsia', 'maroon', 'red', 'yellow'],
            c_len = colors.length,
            words = ['car', 'house', 'sky', 'sun', 'tree', 'road',
                'pen', 'water', 'paper', 'book', 'ship'],
            w_len = words.length;

        // генерация имени сайта
        var generate_site_name = function () {
            var i = Math.floor(Math.random() * c_len),
                color = colors[i],
                j = Math.floor(Math.random() * w_len),
                word = words[j],
                number = Math.floor(Math.random() * 1000);

            return color + '-' + word + '-' + number;
        };

        return {
            generate_site_name: generate_site_name
        };
    }
);

angular.module('PatternApp').factory(
    'ImageState', function () {

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
    }
);