describe('Parser', function() {

  var parser = require('../lib/parser');

  it('parses a div block', function() {

    var ast = parser('<div>ook</div>');

    expect(ast.toString()).toEqual('-<div>' + 
                                   '--ook');
  });

});
