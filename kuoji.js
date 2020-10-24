const http = require('http');
const fs = require('fs').promises;  
const connect = require('connect');
const cors = require('cors');
const ss = require('./services/api');
 
var app = connect();
var config = { port: 1488 };
var cors_options = {
  origin: ['http://localhost:57467', 'http://localhost:1499'],
  optionsSuccessStatus: 200 // For legacy browser support
};

var mime = { 
  lookup: function(file) {

    var ext = file.split('.').pop();

    console.log('mime: ' + ext);

    switch(ext) {
      case 'css': return 'text/css';
      case 'csv': return 'text/csv';  
      case 'html': return 'text/html';  
      case 'gif': return 'text/gif';  
      case 'js': return 'text/javascript';  
      case 'json': return 'text/json';  
      case 'mp3': return 'audio/mpeg';  
      case 'pdf': return 'application/pdf';  
      case 'json': return 'text/json';  
      case 'json': return 'text/json'; 
      default: return 'text/html';
    } 
  } 
};

app.use(cors(cors_options)); 
app.use(function(req, res) { 
 
  var file = __dirname + req.url.replace(/\//g, '\\');
  var url = req.url;

  if (url.includes('/screens/')) {
    file = __dirname + req.url.replace(/\//g, '\\') + '\\index.html';
  } else if (url.includes('/www/')) {
    file = __dirname + req.url;
  } else if (url.includes('/modules/')) {
    file = __dirname + req.url;    
  } else  if (url.includes('.js') || url.includes('.html')) {
    file = __dirname + req.url.replace(/\//g, '\\');
  } else if (url.includes('.')) {
      file = __dirname + '\\www\\error.html'; 
  } else {
    file = __dirname + '\\screens\\index.html';
  }
  
  /* set headers */
  res.setHeader("Content-Type", mime.lookup(file)); 

  /* return document to client */ 
  if (req.url.includes('/www/')) {  
    
    /* wesite_view */ 
    console.log('wesite_view: ' + file);

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
    /* application_view */ 
    console.log('application_view: ' + file);
    console.log('mime: ' + mime.lookup(file));

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
