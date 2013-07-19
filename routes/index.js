
var request = require('request');

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.gif = function(req, res){
  var whimsyPad = "http://firefox-ux.etherpad.mozilla.org/ep/pad/export/thumbnail-gifs/latest?";

  request.get(whimsyPad, function(err, resp, body) {
    var gifs = body.split('\n');
    var random = Math.floor(Math.random() * gifs.length);
    res.json({url: gifs[random]});
  });
};
