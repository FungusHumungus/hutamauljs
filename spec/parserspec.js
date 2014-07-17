describe('Parser', function() {

  var parser = require('../lib/parser');

  describe('when parsing', function() {

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

  });  

  describe('when splitting', function() {

      it ('splits the text when told to', function() {

        var splitter = {
            split: function(token) {
                if (token.text === 'ponk') 
                    return 'po..';

                return null;
            }
        };

        var ast = parser('<div>ook<span>ponk</span>', splitter);

        expect(ast.toString()).toEqual('-<div>' + 
                                       '--ook' +
                                       '--<span>' +
                                       '---po..');
      });

  });

  describe('when returning html', function() {

      it ('returns unclosed tags with a closing tag', function() {
          
          var ast = parser('<div>ook<span>porkwonkle');

          expect(ast.toHtml()).toEqual('<div>ook<span>porkwonkle</span></div>');
      });

  });

});
