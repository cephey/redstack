function FormCtrl($scope, $window) {

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

    //-----------------------------------------------------------------

    // переменная для хранения выбранной картинки
    $scope.mutex = false;

    // список классов для картинок
    $scope.blurs = clear_list($scope.img_count, '');

    // список значений input[radio] картинок
    $scope.check = clear_list($scope.img_count, false);

    // выставляю соответствующий input[radio] в checked
    $scope.checked = function (ind) {
        $scope.check = clear_list($scope.img_count, false);
        $scope.check[ind] = true;
    };

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
    $scope.set_img = function (i) {
        // запоминаю её
        $scope.mutex = i;
        // отмечаю как выбранную
        $scope.checked(i);
        // заблюриваю предыдущую выбранную
        $scope.active(i);
    };
}