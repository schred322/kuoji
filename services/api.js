(function() {
    console.log('kuoji api services');
})();

function test() {
    console.log('testing');
}
const services = (function(service_url) {

    var kuoji_endpoint = 'http://localhost:1488';
    let base_api_url = (service_url === undefined) ? kuoji_endpoint : service_url; 

    const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    console.log('inside: ' + service_url);

    const api_call = (function (method, url) {

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, base_api_url + url);
            xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
              } else {
                reject({
                  status: this.status,
                  statusText: xhr.statusText
                });
              }
            };
            xhr.onerror = function () {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            };
            xhr.send();
          });
    });
 
    return { 
        get_clients: function(url) { 
            return api_call('GET', url);
        },
        get_client_by_id: function(url) { 
            return api_call('GET', url);
        }
    }
});
 
module.exports = { services, test };