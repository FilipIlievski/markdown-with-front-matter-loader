const marked = require('marked');
const yaml = require('yaml-front-matter');
const loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.parseQuery(this.query);
  var obj = yaml.parse(source);

  marked.setOptions({
    highlight(code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  });

  obj.__content = marked(obj.__content, options);
  return 'module.exports = ' + JSON.stringify(obj);
};
