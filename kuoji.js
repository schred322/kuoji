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
 
  var file = __dirname + req.url.replace(/\//g, '\\');
  var url = req.url;

  if (url.includes('/screens/')) {
    file = __dirname + req.url.replace(/\//g, '\\') + '\\index.html';
  } else if (url.includes('/www/')) {
    file = __dirname + req.url;
  } else  if (url.includes('.js') || url.includes('.html')) {
    file = __dirname + req.url.replace(/\//g, '\\');
  } else if (url.includes('.')) {
      file = __dirname + '\\www\\error.html'; 
  } else {
    file = __dirname + '\\screens\\index.html';
  }

  if (req.url.includes('/www/')) {  
    fs.readFile(__dirname + '\\www\\master.html') 
      .then(result => {
        fs.readFile(file)
          .then(contents => {  
            res.writeHead(200);   
            res.end(result.toString().replace('{head}', '').replace("{body}", contents.toString()));
          });  
      }); 
  }
  else 
  {
    console.log(file);
    /* application_view */ 
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
