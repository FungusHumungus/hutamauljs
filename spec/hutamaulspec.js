describe('Hutamaul', function() {
    var hutamaul = require('../lib/hutamaul');

    it('splits simple html', function() {
        var split = hutamaul('<div>hooray<span>here we go</span></div>', 10);
        expect(split).toBe('<div>hooray<span>here...</span></div>');
    });

    it('splits more complex html', function() {
        var split = hutamaul('<div class="womble">This is some awesome code:\n' +
                             '<pre>\n' + 
                             '10 print "I am awesome"\n' +
                             '20 goto 10\n' +
                             '</pre>' +
                             '</div>', 30, {default: 'line'});

        expect(split).toBe('<div class="womble">This is some awesome code:\n' +
                           '<pre>\n' + 
                           '10 print "I am awesome"\n' +
                           '...</pre></div>');

    });

});
