(function() {
var templates = {};
templates["output.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>8pad output</title>\n  <link rel=\"stylesheet\" href=\"/css/output.css\">\n  <script src=\"/lib/jquery/jquery.js\"></script>\n  <script src=\"/lib/highlightjs/highlight.pack.js\"></script>\n</head>\n<body>\n";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "html"), env.autoesc);
output += "\n<script>\n$(document).ready(function() {\n  $('code').each(function(i, el) {\n    hljs.highlightBlock(el);\n  });\n});\n</script>\n</body>\n</html>\n";
return output;
} catch (e) {
  runtime.handleError(e, lineno, colno);
}
}
return {
root: root
};
})();
templates["index.html"] = (function() {function root(env, context, frame, runtime) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>8pad</title>\n  <link rel=\"stylesheet\" href=\"/lib/font-awesome/css/font-awesome.css\">\n  <link rel=\"stylesheet\" href=\"css/main.css\">\n</head>\n\n<body id=\"home\" class=\"hidden\">\n<header>\n8pad <span class=\"icon-save\"></span>\n</header>\n<div id=\"main\">\n  <section id=\"editor-panel\">\n    <div id=\"editor\">\nHello world.\n=============\nThis is an example of *lots* of cool stuff.\n\n- One\n- Two\n- Threeg\n\n[Google](https://www.google.com)!\n\n```javascript\ndocument.getElementById(\"stuff\");\n```\n\ncss\n====\n\n```css\n#preview {\n  width: 100%;\n  border: none;\n  box-sizing: border-box;\n}\n\nsection {\n  width: 50%;\n  height: 100%;\n  float: left;\n  position: relative;\n}\n\n#editor {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n```\n      </div>\n    </section>\n    <section id=\"preview-panel\">\n      <iframe id=\"preview\"></iframe>\n    </section>\n  </div>\n  <script src=\"/lib/requirejs/require.js\" data-main=\"/js/main.js\"></script>\n</body>\n</html>\n";
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