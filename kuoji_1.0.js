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
                
                /* cleanup */
                var cleanup = document.querySelectorAll('[kuoji');
                Array.prototype.forEach.call( cleanup, function( node ) {
                    node.parentNode.removeChild( node );
                });

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
                    var script_tag = doc.head.getElementsByTagName('script')[i];

                    script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.id = (script_tag.id === '') ? "kuoji_script_" + i : script_tag.id;
                    script.setAttribute('kuoji','true');
                    if (script_tag !== '') {
                        script.type = script_tag.type;
                    }
                    if (script_tag.src !== ''){ 
                        script.src = script_tag.src;
                    } else {
                        script.text = (script_tag !== undefined) ? script_tag.innerHTML + debug_file : ''; 
                    }  
                    document.head.appendChild(script); 
                }; 
 
                /* links */
                var links = doc.head.getElementsByTagName('link');
                var link;

                for(var i = 0; i <= links.length; i++) {
                    
                    if (links[i] === undefined) { continue; }
                      
                    var link_tag = doc.head.getElementsByTagName('link')[i];

                    link = document.createElement('link');
                    link.type = 'text/javascript'; 
                    link.id = (link_tag.id === '') ? "kuoji_link_" + i : link_tag.id;
                    link.setAttribute('kuoji','true');
                    link.ref = link_tag.ref;
                    link.type = link_tag.type;
                    link.href = link_tag.href;  
                    document.head.appendChild(link); 
                }; 

                /* styles */
                var styles = doc.head.getElementsByTagName('style');
                var style;
                
                for(var i = 0; i <= styles.length; i++) {

                    if (styles[i] === undefined) { continue; }
 
                    var style_tag = doc.head.getElementsByTagName('style')[i];

                    style = document.createElement('style'); 
                    style.id = (style_tag.id === '') ? "style_tag" + i : style_tag.id;
                    style.setAttribute('kuoji','true');
                    style.innerHTML = (style_tag !== undefined) ? style_tag.innerHTML : '';  
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