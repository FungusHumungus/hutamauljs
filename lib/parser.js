var tokenizer = require('./tokenizer');

/**
 * Provide an empty splitter if one isn't provided.
 */
var nullSplitter = {
    split: function() { return null; }
}

module.exports = function(input, splitter) {    
  splitter = splitter || nullSplitter;

  var tokens = tokenizer(input),
      root = new Tag('root', splitter),
      token;

  while (token = tokens()) { // jshint ignore:line
    root.addToken(token);
  }

  return root;
};

function tokenToParsed(token, splitter) {
  if (token.type === 'text')
    return new Text(token.content);

  return new Tag(token.content, splitter);
}

function Text(text) {

  this.text = text;

  this.wantsMore = false;

  this.getTag = function() {
      return null;
  };

  this.toString = function(indent) {
      return indent + this.text;
  };

  this.toHtml = function() {
      return this.text;
  }

  this.effectiveLength = function() {
    return this.text.length;
  };

}

function Tag(label, splitter) {

  // We start off wanting more text until we get a termination tag
  var _children = [];

  function getTag() {
      var re = /<(.*?)[\s>]/;
      var match = re.exec(label);

      return match && match[1];
  }

  function getEndTag() {
      var tag = getTag();

      return '</' + tag + '>';
  }
  
  this.wantsMore = true;

  this.getTag = getTag;

  /**
   *
   * Add a new token to the tree.
   *
   */
  this.addToken = function(token) {

    for (var i=0; i < _children.length; i++) {
      var child = _children[i];

      if (child.wantsMore) {
        child.addToken(token);
        return;
      }
    }

    // None of our children want it, so we will take it.
    if (token.type === 'endtag') {
      // TODO : Check end tag is actually this tags end tag.
      this.wantsMore = false;
    }
    else {
      var parsed = tokenToParsed(token, splitter);
      var split = splitter.split(parsed);
      if (split) {
          // We need to split the text now.
          parsed.text = split;
      }

      _children.push(parsed);
    }
  };

  /**
   *
   * Gets the effective length of the tree.
   * Tags don't add to length, text does.
   *
   */
  this.effectiveLength = function() {
    return 0;
  };

  /**
   *
   * Show the ast as text.. useful for testing.
   *
   */
  this.toString = function(indent) {
    indent = indent || '';
    var result = indent + (label !== 'root' ? label : '');

    for (var i=0; i < _children.length; i++) {
      var child = _children[i];
      result += child.toString(indent + '-');
    }

    return result;
  };

  /**
   * Returns well formed Html
   */
  this.toHtml = function() {
    var result = label !== 'root' ? label : '';

    for (var i=0; i < _children.length; i++) {
      var child = _children[i];
      result += child.toHtml();
    }

    // Close the tag.
    if (label !== 'root')
        result += getEndTag();
    return result;
  }
}
