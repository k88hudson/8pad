require.config({
  baseUrl: '/lib',
  paths: {
    'js': '/js',
    'jquery': '/lib/jquery/jquery',
    'nunjucks': '/js/nunjucks',
    'ace': '/lib/ace/lib/ace'
  }
});
require(['jquery',
    'nunjucks',
    'ace/ace',
    'showdown/src/showdown',
    'js/template'
  ], function($, nunjucks, ace) {

  var previewFrame = document.getElementById('preview');
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;

  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/markdown');
  editor.getSession().setTabSize(2);
  editor.setShowPrintMargin(false);

  var converter = new Showdown.converter();
  var nj = nunjucks.env;

  function parseGifs(raw) {
    var gifs = raw.match(/\{\{gif\-?\d*\}\}/g);
    if(gifs && gifs.length) {
      for (var i=0; i<gifs.length; i++) {
        var n = gifs[i].match(/^\d+$/) || Math.floor(Math.random() * 100);
        console.log(n);
        raw = raw.replace(gifs[i], '<img class="giffy" src="/gif?id=' + n + '">');
      }
      var total = gifs && gifs.length;
    }
    return raw;
  }

  function updatePreview() {
    var raw = editor.getValue();
    // raw = parseGifs(raw);
    var html = converter.makeHtml(raw);
    var rendered = nj.render('output.html', {html: html});
    preview.open();
    preview.write(rendered);
    preview.close();
  }

  editor.on('change', updatePreview);
  updatePreview();

  // Sidebar
  var $main = $('#main');
  var $menuBtn = $('#menu-btn');
  $menuBtn.click(function(e) {
    $main.toggleClass('collapsed');
    $menuBtn.toggleClass('collapsed');
  });

  $('.wrapper').removeClass('hidden');

});
