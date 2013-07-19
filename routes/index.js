var request = require('request');
var whimsyPad = "http://firefox-ux.etherpad.mozilla.org/ep/pad/export/thumbnail-gifs/latest?";
var gifs;


exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.gif = function(req, res){
  function redirect() {
    var id = req.query.id || Math.floor(Math.random() * gifs.length);
    res.redirect(gifs[id]);
  }
  if (!gifs) {
    request.get(whimsyPad, function(err, resp, body) {
      gifs = body.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g);
      redirect();
    });
  } else {
    redirect();
  }
};

