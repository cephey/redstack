var PatternApp = angular.module('PatternApp', []);

PatternApp.config(['$interpolateProvider', '$httpProvider',
    function ($interpolateProvider, $httpProvider) {

        /* задаю маркеры шаблонизатора */
        $interpolateProvider.startSymbol('[%');
        $interpolateProvider.endSymbol('%]');

        /* заголовки POST запроса для AJAX */
        var csrf = document.querySelector('input[name=csrfmiddlewaretoken]');
        if (csrf) {
            $httpProvider.defaults.headers.post['X-CSRFToken'] = csrf.getAttribute('value');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
    }]);

PatternApp.controller('FormCtrl', ['$scope', '$http', function ($scope, $http) {

    //---внутренние переменные и функции-------------------------------

    // генерация списка классов для картинок
    var clear_list = function (count, pattern) {
        var result = new Array(count);
        for (var i = 0; i < count; i++) {
            result[i] = pattern;
        }
        return result;
    };

    // генерация списка из индексов картинок
    var build_index_list = function (count) {
        var result = new Array(count);
        for (var i = 0; i < count; i++) {
            result[i] = i;
        }
        return result;
    };

    // для генерации имени сайта
    var colors = ['blue', 'red', 'yellow', 'white', 'green', 'black'],
        c_len = colors.length,
        words = ['car', 'house', 'sky', 'sun', 'tree', 'road'],
        w_len = words.length;

    //-----------------------------------------------------------------

    $scope.formData = {};

    // переменная для хранения выбранной картинки
    $scope.mutex = false;

    // список классов для картинок
    $scope.blurs = clear_list($scope.img_count, '');

    // срабатывает когда мышь наводится на картинку
    $scope.active = function (ind) {
        // с текущеё картинки убираем блюр
        $scope.blurs[ind] = '';

        // вычисляем какие картинки заблюрить

        // создаем список картинок
        var tmp = build_index_list($scope.img_count);

        // убираем текущую из этого списка
        tmp.splice(ind, 1);
        // убираем активную из этого списка
        if ($scope.mutex !== false) {
            var index = tmp.indexOf($scope.mutex);
            if (index !== -1) {
                tmp.splice(index, 1);
            }
        }
        // все остальные блюрим
        tmp.forEach(function (elem) {
            $scope.blurs[elem] = 'blur';
        });
    };

    // срабатывает, когда мышь покидает картинку
    $scope.deactive = function () {
        if ($scope.mutex === false) {
            // если пользователь ещё не кликал по картинкам,
            // то снимаю блюр со всех
            $scope.blurs = clear_list($scope.img_count, '');
        } else {
            // если пользователь кликнул по какой-то,
            // то заново псевдо активирую её, чтобы заблюрить все оставшиеся
            $scope.active($scope.mutex);
        }
    };

    // выбор(клик) по картинке
    $scope.set_img = function (i, val) {
        // запоминаю её
        $scope.mutex = i;
        // отмечаю как выбранную
        $scope.formData.site_template = val;
        // заблюриваю предыдущую выбранную
        $scope.active(i);
    };

    // генерация имени сайта
    $scope.generate_name = function () {
        var i = Math.floor(Math.random() * c_len),
            color = colors[i],
            j = Math.floor(Math.random() * w_len),
            word = words[j],
            number = Math.floor(Math.random() * 1001);

        $scope.formData.site_name = color + '-' + word + '-' + number;
    };

    $scope.submit = function (url) {

        $http.post(url, $.param($scope.formData)).
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    };
}]);