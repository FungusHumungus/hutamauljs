var tokenizer = require('./tokenizer');

module.exports = function(input) {

  var tokens = tokenizer(input),
      root = new Tag('root'),
      token;

  while (token = tokens()) { // jshint ignore:line
    root.addToken(token);
  }

  return root;
};

function tokenToParsed(token) {
  if (token.type === 'text')
    return new Text(token.content);

  return new Tag(token.content);
}

function Text(text) {

  this.wantsMore = false;

  this.toString = function(indent) {
      return indent + text;
  };
}

function Tag(label) {

  // We start off wanting more text until we get a termination tag
  var children = [];
  
  this.wantsMore = true;

  this.addToken = function(token) {

    for (var i=0; i < children.length; i++) {
      var child = children[i];

      if (child.wantsMore) {
        child.addToken(token);
        return;
      }
    }

    // None of our children want it, so we will take it.
    if (token.type === 'endtag')
      // TODO : Check end tag is actually this tags end tag.
      this.wantsMore = false;
    else 
      children.push(tokenToParsed(token));
  };

  this.toString = function(indent) {
    indent = indent || '';
    var result = indent + (label !== 'root' ? label : '');

    for (var i=0; i < children.length; i++) {
      var child = children[i];
      result += child.toString(indent + '-');
    }

    return result;
  };
}
