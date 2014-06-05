angular.module('PatternApp').controller(
    'PatternFormCtrl',
    ['$scope', '$http', 'NameGenerator', 'ImageState', 'UserHandler', 'PatternHandler',
        function ($scope, $http, NameGenerator, ImageState, UserHandler, PatternHandler) {

            // данные формы
            $scope.formData = {};

            // генерация имени сайта
            $scope.generate_name = function () {
                $scope.formData.site_name = NameGenerator.generate_site_name();
            };

            // TODO: как то получить количество картинок из шаблона
            $scope.img_count = 3;

            // список css классов картинок
            $scope.blurs = ImageState.get_blurs($scope.img_count);

            // наведение мыши на картинку / вывод мыши с картинки
            $scope.active = ImageState.active;
            $scope.deactive = ImageState.deactive;

            // клик по картинке шаблона
            $scope.set_img = function (val) {
                ImageState.set_img();
                $scope.formData.site_template = val;
            };

            // сабмит формы
            $scope.submit = function (url) {
                UserHandler.is_auth().then(function (is_auth) {
                    if (is_auth === true) {
                        PatternHandler.send_pattern_form(url, $scope.formData);
                    } else {
                        UserHandler.login(function () {
                            PatternHandler.send_pattern_form(url, $scope.formData)
                        });
                    }
                });
            };
        }
    ]
);