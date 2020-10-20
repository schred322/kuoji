/*
 *  Author:         Chewie
 *  Date:           10.17.2020
 *  Technology:     rsi [ remote screen invocation ]
 *  Software:       Kuoji 
 */

var Kuoji = function () { 

    console.log("Kuoji with RSI Technology");

    /* properties */
    var config = {
        endpoint: 'http://localhost:1488'
    }; 
    
    (function (a) { var b = a.prototype, d = b.parseFromString; try { return (new a).parseFromString("", "text/html") } catch (e) { } b.parseFromString = function (a, b) { var c; return /^\s*text\/html\s*(?:;|$)/i.test(b) ? (c = document.implementation.createHTMLDocument(""), (/<!DOCTYPE/i.test(a) ? c.documentElement : c.body).innerHTML = a, c) : d.apply(this, arguments) } })(DOMParser);

    /* private methods */
    function get(screen, target) { 
        fetch(screen)
            .then(r => r.text())
            .then(d => { 
    
                /* html */
                document.getElementById(target).innerHTML = '';
                var parser = new DOMParser();
                var doc = parser.parseFromString(d, 'text/html');  
                document.getElementById(target).innerHTML = doc.body.innerHTML; 
    
                /* script */
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = "kuoji_script"; 
                script.text = (doc.head.getElementsByTagName('script')[0] !== undefined) ? doc.head.getElementsByTagName('script')[0].innerHTML : ''; 
                if (document.getElementById("kuoji_script")) {
                    document.getElementById("kuoji_script").remove();
                }  
                document.head.appendChild(script); 
    
                /* style */
                var style = document.createElement('style'); 
                style.id = "kuoji_style"; 
                style.innerHTML = (doc.head.getElementsByTagName('style')[0] !== undefined) ? doc.head.getElementsByTagName('style')[0].innerHTML : ''; 
                if (document.getElementById("kuoji_style")) {
                    document.getElementById("kuoji_style").remove();
                }   
                document.head.appendChild(style);
            });
    }; 
    function get_screen(name, target) {
        get(config.endpoint + '/screens/' + name, target);
    }; 
    
    /* public methods */
    return {
        screen: function (name, target) {
            get_screen(name, target);
        }
    }
};
var kuoji = new Kuoji(); 