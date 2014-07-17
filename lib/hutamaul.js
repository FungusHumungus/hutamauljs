var parser = require('./parser'),
    Splitter = require('./splitter');

module.exports = function(input, splitAt, options) {
    // Parse and split the input
    var ast = parser(input, new Splitter(splitAt, options));

    // Return the html.
    return ast.toHtml();
}
