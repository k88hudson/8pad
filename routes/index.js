
var request = require('request');

exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.gif = function(req, res){
  var whimsyPad = "http://firefox-ux.etherpad.mozilla.org/ep/pad/export/thumbnail-gifs/latest?";

  request.get(whimsyPad, function(err, resp, body) {
    //var gifs = body.split('\n');
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    var gifs = body.match(regex);
    console.log(gifs.length);
    var random = Math.floor(Math.random() * gifs.length);
    res.redirect(gifs[random]);
  });
};
