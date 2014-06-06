angular.module('Cookies', []);

angular.module('Cookies').factory('Cookies', function () {

        var getCookie = function (name) {
            var matches = document.cookie.match(
                new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        return {
            getCookie: getCookie
        };
    }
);