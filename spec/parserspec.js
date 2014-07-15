describe('Parser', function() {

  var parser = require('../lib/parser');

  it('parses a div block', function() {

    var ast = parser('<div>ook</div>');

    expect(ast.toString()).toEqual('-<div>' + 
                                   '--ook');
  });

  it('parses multiple div blocks', function() {

      var ast = parser('<div>ook</div><div>ponk</div>');

      expect(ast.toString()).toEqual('-<div>' + 
                                     '--ook' +
                                     '-<div>' +
                                     '--ponk');
  });

  it('parses multiple nodes per branch', function() {
      
      var ast = parser('<div>ook<span>ponk</span>wonkle</div>');

      expect(ast.toString()).toEqual('-<div>' + 
                                     '--ook' + 
                                     '--<span>' +
                                     '---ponk' +
                                     '--wonkle');

  });

  it('returns an effective length that ignores tags', function() {

      var ast = parser('<div>ook<span>ponk</span>');

      expect(ast.effectiveLength()).toEqual(7);

  });

});
