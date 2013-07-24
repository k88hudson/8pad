var request = require('request');
var whimsyPad = "http://firefox-ux.etherpad.mozilla.org/ep/pad/export/thumbnail-gifs/latest?";
var gifs;


exports.index = function(req, res){
  res.render('index.html', { title: 'Express' });
};

exports.gif = function(req, res){
  function redirect() {

    var id = req.query.id || Math.floor(Math.random() * gifs.length);
    if(gifs && gifs[id]) {
      res.redirect(gifs[id]);
    }
  }
  if (!gifs) {
    console.log("Getting pad...");
    request.get(whimsyPad, function(err, resp, body) {
      console.log(err, resp, 'There was an error getting a response from whimsyPad');
      if (!body) {
        console.log(err, resp, 'There was an error getting a response from whimsyPad');
      }
      gifs = body.match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g);
      redirect();
    });
  } else {
    redirect();
  }
};

