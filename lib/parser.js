var tokenizer = require('./tokenizer');

module.exports = function(input) {

  var tokens = tokenizer(input),
      root = new Tag('root');
      token;

  while (token = tokens()) {
    root.addToken(token);
  }

};

function tokenToParsed(token) {
  if (token.type === 'text')
    return new Text(token.content);

  return Tag(token.content);
}

function Text(text) {

  this.wantsMore = false;

}

function Tag(label) {

  // We start off wanting more text until we get a termination tag
  var children = [];
  
  this.wantsMore = true;

  this.addToken = function(token) {

    for (var i=0; i < children.length - 1; i++) {
      var child = children[i];

      if (child.wantsMore) {
        child.addToken(token);
        return;
      }
    }

    // None of our children want it, so we will take it.
    if (token.type === 'endtag')
      wantsMore = false;
    else 
      this.children.push(token);
  }
}
