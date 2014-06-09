(function (root, factory) {
    root.Loader = factory();
})(this, function () {
    'use strict';
    return {
        create: function (name) {
            return (function () {
                var selector = 'btn-submit-' + name;
                var loading;
                var show = function () {
                    loading = Ladda.create(document.querySelector('.' + selector));
                    loading.start();
                };
                var hide = function () {
                    loading.stop();
                };
                return {
                    selector: selector,
                    show: show,
                    hide: hide
                }
            })();
        }
    }
});