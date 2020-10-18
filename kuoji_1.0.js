/*
 *  Author:         chewie
 *  Date:           10.17.2020
 *  Technology:     rsi [ remote screen invocation ]
 *  Software:       Kuoji
 */
(function (a) { var b = a.prototype, d = b.parseFromString; try { return (new a).parseFromString("", "text/html") } catch (e) { } b.parseFromString = function (a, b) { var c; return /^\s*text\/html\s*(?:;|$)/i.test(b) ? (c = document.implementation.createHTMLDocument(""), (/<!DOCTYPE/i.test(a) ? c.documentElement : c.body).innerHTML = a, c) : d.apply(this, arguments) } })(DOMParser);

var Kuoji = function () {

    /* properties */
    var config = {
        endpoint: 'http://localhost:1488'
    };

    /* private methods */
    function get(screen, target) {

        fetch(screen)
            .then(r => r.text())
            .then(d => {

                document.getElementById(target).innerHTML = '';
                var parser = new DOMParser();
                var doc = parser.parseFromString(d, 'text/html');
                document.getElementById(target).innerHTML = doc.body.innerHTML;

                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.text = (doc.head.getElementsByTagName('script')[0] !== undefined) ? doc.head.getElementsByTagName('script')[0].innerHTML : '';

                document.head.appendChild(script);
            });
    };

    function screen(name, target) {
        get(config.endpoint + '/screens/' + name, target);
    };

    /* public methods */
    return {
        screen: function (name, target) {
            screen(name, target);
        }
    }
};
var kuoji = new Kuoji();

console.log("Kuoji with RSI Technology")