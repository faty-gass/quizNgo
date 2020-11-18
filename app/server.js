var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
//app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

app.listen(port)
console.log('server started on port ' + port)