//angular.module('PatternApp').factory(
//    'ImageState', function () {
//
//
//    }
//);

angular.module('PatternApp').factory(
    'PatternHandler', ['$http',
        function ($http) {

            var send_pattern_form = function (url, formData) {

                var loading = Ladda.create(document.querySelector('.btn-submit-pattern'));
                loading.start();

                $http.defaults.headers.post['X-CSRFToken'] = Cookie.getCookie('csrftoken');

                $http.post(url, $.param(formData))
                    .success(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                    })
                    .then(function () {
                        loading.stop();
                    });
            };

            return {
                send_pattern_form: send_pattern_form
            };
        }
    ]
);