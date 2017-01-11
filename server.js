//  OpenShift sample Node application
var express = require('express'),
    fs      = require('fs'),
    app     = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost';

app.get('/', function (req, res) {
    res.send('aa aa aa');
});

app.listen(port, ip);

console.log('Server running on http://%s:%s', ip, port);

//module.exports = app ;
