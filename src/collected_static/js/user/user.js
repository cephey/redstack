angular.module('UserApp', []);

angular.module('UserApp').config(
    ['$interpolateProvider', '$httpProvider', function ($interpolateProvider, $httpProvider) {

        /* задаю маркеры шаблонизатора */
        $interpolateProvider.startSymbol('[%');
        $interpolateProvider.endSymbol('%]');

        /* заголовки POST запроса для AJAX */
        var csrf = document.querySelector('input[name=csrfmiddlewaretoken]');
        if (csrf) {
            $httpProvider.defaults.headers.post['X-CSRFToken'] = csrf.getAttribute('value');
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
    }]
);

angular.module('UserApp').factory(
    'UserHandler', function () {

    }
);

angular.module('UserApp').controller(
    'LoginFormCtrl',
    ['$scope', '$http', 'UserHandler',
        function ($scope, $http, UserHandler) {

        }
    ]
);