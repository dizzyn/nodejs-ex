const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      env          = process.env;

var server = http.createServer(function (req, res) {
  var url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else {
    fs.readFile('./static' + url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        var ext = path.extname(url).slice(1);
        res.setHeader('Content-Type', contentTypes[ext] || "application/octet-stream");
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});

var port = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.PORT || 8080;
var ip   = process.env.OPENSHIFT_NODEJS_IP || process.env.IP  || 'localhost';

server.listen(port, ip, function () {
  console.log(`Application worker ${process.pid} started...`);
});
