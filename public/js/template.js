(function() {
var templates = {};
templates["index.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>8pad</title>\n\n    <link rel=\"stylesheet\" href=\"/codemirror/lib/codemirror.css\">\n    <script src=\"/codemirror/lib/codemirror.js\"></script>\n    <script src=\"/codemirror/addon/edit/continuelist.js\"></script>\n    <script src=\"/codemirror/mode/xml/xml.js\"></script>\n    <script src=\"/codemirror/mode/markdown/markdown.js\"></script>\n\n    <script src=\"/gfm/scripts/showdown.js\"></script>\n\n  <link rel=\"stylesheet\" href=\"css/main.css\">\n  <!--[if IE]>\n      <script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script>\n  <![endif]-->\n</head>\n\n<body id=\"home\">\n\n  <section id=\"editor-panel\">\n    <form>\n      <textarea id=\"code\" name=\"code\">\nHello world.\n=============\nThis is an example of *lots* of cool stuff.\n\n- One\n- Two\n- Three\n\n[Google](https://www.google.com)!\n\n```javascript\ndocument.getElementById(\"stuff\");\n```\n      </textarea>\n    </form>\n  </section>\n  <section id=\"preview-panel\">\n    <iframe id=\"preview\"></iframe>\n  </section>\n  <script src=\"js/nunjucks.js\"></script>\n  <script src=\"js/template.js\"></script>\n  <script>\n  var converter = new Showdown.converter();\n  var nj = nunjucks.env;\n  var editor = CodeMirror.fromTextArea(document.getElementById(\"code\"), {\n    mode: 'markdown',\n    lineNumbers: true,\n    theme: 'default',\n    extraKeys: {'Enter': 'newlineAndIndentContinueMarkdownList'}\n  });\n  function updatePreview() {\n    var raw = editor.getValue();\n    raw = raw.replace(/>/g, \">\\n\").replace(/</g, \"\\n<\").replace(/\\n{2,}/g, \"\\n\\n\");\n    var html = converter.makeHtml(raw);\n    var rendered = nj.render(\"output.html\", {html: html});\n    //Replace pre with pre code for highlight.js\n    var previewFrame = document.getElementById('preview');\n    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;\n    preview.open();\n    preview.write(rendered);\n    preview.close();\n  }\n  editor.on('change', updatePreview);\n  updatePreview();\n  </script>\n</body>\n</html>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["output.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>8pad output</title>\n  <script src=\"http://code.jquery.com/jquery-1.10.1.min.js\"></script>\n  <link rel=\"stylesheet\" href=\"http://yandex.st/highlightjs/7.3/styles/default.min.css\">\n  <link rel=\"stylesheet\" href=\"/css/tmr-night.css\">\n  <script src=\"http://yandex.st/highlightjs/7.3/highlight.min.js\"></script>\n</head>\n<body>\n";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "html"), env.autoesc);
output += "\n<script>\n$(document).ready(function() {\n  $.ajax(\"/gif\", function(data) {\n    console.log(\"yp\",  data);\n  });\n  $('pre').each(function(i, el) {\n    var code = document.createElement(\"code\");\n    code.className = el.getAttribute(\"lang\");\n    code.innerHTML = el.innerHTML;\n    el.innerHTML = \"\";\n    el.appendChild(code);\n    hljs.highlightBlock(el);\n  });\n});\n</script>\n</body>\n</html>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
if(typeof define === "function" && define.amd) {
    define(["nunjucks"], function(nunjucks) {
        nunjucks.env = new nunjucks.Environment([], {});
        nunjucks.env.registerPrecompiled(templates);
        return nunjucks;
    });
}
else if(typeof nunjucks === "object") {
    nunjucks.env = new nunjucks.Environment([], {});
    nunjucks.env.registerPrecompiled(templates);
}
else {
    console.error("ERROR: You must load nunjucks before the precompiled templates");
}
})();