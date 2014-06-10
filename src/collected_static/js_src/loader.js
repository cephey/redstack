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