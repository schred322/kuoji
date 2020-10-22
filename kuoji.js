const http = require('http');
const fs = require('fs').promises;  
const connect = require('connect');
const cors = require('cors');
const ss = require('./services/api');


var app = connect();
var config = { port: 1488 };
var cors_options = {
  origin: ['http://localhost:57467', 'http://localhost:1234'],
  optionsSuccessStatus: 200 // For legacy browser support
};



app.use(cors(cors_options)); 
app.use(function(req, res) {

  /*
  var d = fs.readFile(__dirname + req.url.replace(/\//g, '\\'))  
            .then(result => {return result}) 
            .catch(error => console.log('error: ' + error));
  */
 
  let file = __dirname + req.url.replace(/\//g, '\\') + '\\index.html';

  if (req.url.includes('.js') || req.url.includes('.html')) {
    file = __dirname + req.url;
  } else if (req.url.includes('.')) {
      file = __dirname + '\\error.html'; 
  }  
  
  if (req.url.includes('/www/')) { 

    //fs.readFile(__dirname + req.url.replace(/\//g, '\\'))
    fs.readFile(__dirname + '\\www\\master.html') 
      .then(result => {
        fs.readFile(file)
          .then(contents => {  
            res.writeHead(200);   
            res.end(result.toString().replace('{head}', '').replace("{body}", contents.toString()));
          }); 
    
        //res.write(result.toString());
        //res.write('pull master: ' + contents.toString());
        //console.log(__dirname + req.url.replace(/\//g, '\\'));
        /*
        res.writeHead(200); 
        res.write(contents.toString().replace('{head}', '').replace('{body}', d.toString()));
        res.end();
        */

        //console.log('kuoji www response.');
        //console.log(screen); 
        //res.end(contents.toString().replace('{body}', screen)); 
      });  
 
  }
  else 
  {
    fs.readFile(file)
      .then(contents => {  
        res.writeHead(200);   
        res.end(contents.toString());
      });   
  } 
});  
 
app.listen(config.port, () => {
  console.log('Kuoji is listening on port ' + config.port);
});

/* extras */
// + '<div style="position:absolute; bottom:0; padding:10px; with:100%; background:#f1f1f1;" >Kuoji (2020) with RSI Technology</div>'


