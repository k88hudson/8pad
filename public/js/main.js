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
  editor.setTheme('ace/theme/tomorrow');
  editor.getSession().setMode('ace/mode/markdown');


  var converter = new Showdown.converter();
  var nj = nunjucks.env;

  function updatePreview() {
    var raw = editor.getValue();
    var html = converter.makeHtml(raw);
    var rendered = nj.render('output.html', {html: html});
    preview.open();
    preview.write(rendered);
    preview.close();
  }

  editor.on('change', updatePreview);
  updatePreview();
});
