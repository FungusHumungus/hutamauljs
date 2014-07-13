/**
 *
 * Checks if the given token is acceptable as a token
 *
 */
function isTagStart(token) {
  return token === '<';
}

function isTagEnd(token) {
  return token === '>';
}

/**
 *
 * Returns the type of the tag.
 *
 * <blah> = tag
 * </blah> = endtag
 * <blah /> = lonertag
 *
 */
function tagType(tag) {

  if (/^<\//.test(tag))
    return 'endtag';

  if (/\/>$/.test(tag))
    return 'lonertag';

  return 'tag';
}


/**
 *
 * Returns a function that each time it is called it returns the next 
 * token in the stream.
 *
 * Returns null when there are no more tokens.
 *
 */
module.exports = function(input) {

  var pos = 0;

  return function() {
    var token = null,
        inTag = false;

    while (pos < input.length) {
      var nextChar = input[pos];

      // Check the first character to see if we are starting a tag.
      if (!token) {
        if (isTagStart(nextChar)) {
          inTag = true;
        } 


        token = '';
      }

      // At the start of the tag
      if (!inTag && isTagStart(nextChar))
        return {content: token, type: 'text'};

      token += nextChar;
      pos++;

      if (inTag && isTagEnd(nextChar)) {
        return {content: token, type: tagType(token)};
      }

    }

    // No token found just return the rest of the token
    return token;
  };

};
