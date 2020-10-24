/*
 *  Author:         Chewie
 *  Date:           10.17.2020
 *  Technology:     rsi [ remote screen invocation ]
 *  Software:       Kuoji 
 */

var Kuoji = function () { 

    console.log("Kuoji screens with RSI Technology");

    /* properties */
    var config = {
        kuoji_server: 'http://localhost:1488'
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

                /* scripts */
                var scripts = doc.head.getElementsByTagName('script');
                var script;

                for(var i = 0; i <= scripts.length; i++) {
                    
                    if (scripts[i] === undefined) { continue; }
                     
                    var debug_file = '//# sourceURL=kuoji_script_' + i + '_debug.js';

                    script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.id = "kuoji_script_" + i; 
                    if (doc.head.getElementsByTagName('script')[i] !== '') {
                        script.type = doc.head.getElementsByTagName('script')[i].type;
                    }
                    if (doc.head.getElementsByTagName('script')[i].src !== ''){ 
                        script.src = doc.head.getElementsByTagName('script')[i].src;
                    } else {
                        script.text = (doc.head.getElementsByTagName('script')[i] !== undefined)
                                    ? doc.head.getElementsByTagName('script')[i].innerHTML + debug_file
                                    : ''; 
                    } 
                    if (document.getElementById("kuoji_script_" + i)) {
                        document.getElementById("kuoji_script_" + i).remove();
                    } 
                    document.head.appendChild(script); 
                }; 
 
                /* links */
                var links = doc.head.getElementsByTagName('link');
                var link;

                for(var i = 0; i <= links.length; i++) {
                    
                    if (links[i] === undefined) { continue; }
                      
                    link = document.createElement('link');
                    link.type = 'text/javascript';
                    link.id = "kuoji_link_" + i; 
                    link.ref = doc.head.getElementsByTagName('link')[i].ref;
                    link.type = doc.head.getElementsByTagName('link')[i].type;
                    link.href = doc.head.getElementsByTagName('link')[i].href; 
                    if (document.getElementById("kuoji_link_" + i)) {
                        document.getElementById("kuoji_link_" + i).remove();
                    } 
                    document.head.appendChild(link); 
                }; 

                /* styles */
                var styles = doc.head.getElementsByTagName('style');
                var style;
                
                for(var i = 0; i <= styles.length; i++) {

                    if (styles[i] === undefined) { continue; }
 
                    style = document.createElement('style'); 
                    style.id = "kuoji_style_" + i; 
                    style.innerHTML = (doc.head.getElementsByTagName('style')[i] !== undefined)
                                        ? doc.head.getElementsByTagName('style')[i].innerHTML 
                                        : ''; 
                    if (document.getElementById("kuoji_style_" + i)) {
                        document.getElementById("kuoji_style_" + i).remove();
                    }   
                    document.head.appendChild(style);
                } 
            });
    }; 
    function get_screen(name, target, callback) {
        get(config.kuoji_server + '/screens/' + name, target);
    }; 
    
    /* public methods */
    return {
        screen: function (name, target) {
            get_screen(name, target);
        }
    }
};
var kuoji = new Kuoji(); 