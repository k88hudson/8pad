var express = require('express');
var nunjucks = require('nunjucks-middleware');
var routes = require('./routes');
var app = express();
var http = require('http');
var stylus = require('stylus');
var nib = require('nib');

// Stylus
function compileStylus(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', false)
    .set('force', true)
    .use(nib());
}

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(nunjucks({
    src: '/views',
    output: '/public/js/template.js',
    debug: true,
    express: app
  }));
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compileStylus
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.use('/lib', express.static(__dirname + '/bower_components'));

app.use('/codemirror', express.static(__dirname + '/node_modules/codemirror'));
app.use('/gfm', express.static(__dirname + '/node_modules/github-flavored-markdown'));
app.use('/highlight', express.static(__dirname + '/node_modules/highlight.js'));
app.get('/', routes.index);
app.get('/gif', routes.gif);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
