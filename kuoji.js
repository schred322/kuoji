const http = require('http');
const fs = require('fs').promises;  
const connect = require('connect');
const cors = require('cors');
var app = connect();
var config = { port: 1488 };
var cors_options = {
  origin: ['http://localhost:57467', 'http://localhost:1234'],
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(cors_options)); 
app.use(function(req, res) {

  let file = __dirname + req.url.replace(/\//g, '\\') + '\\index.html';

  if (req.url.includes('.js') || req.url.includes('.html')) {
    file = __dirname + req.url;
  } else if (req.url.includes('.')) {
      file = __dirname + '\\error.html'; 
  }

  fs.readFile(file)
    .then(contents => {  
      res.writeHead(200); 
      res.end(contents.toString());
    }); 
});
app.listen(config.port, () => {
  console.log('Kuoji is listening on port ' + config.port);
});

/* extras */
// + '<div style="position:absolute; bottom:0; padding:10px; with:100%; background:#f1f1f1;" >Kuoji (2020) with RSI Technology</div>'