describe("splitter", function() {
    var Splitter = require('../lib/splitter');

    it("splits at character count as default", function() {

        // Split at 14 characters for all tags
        // No options defaults to split at char
        var splitter = new Splitter(13);

        var a = splitter.split({text: 'ook ook ook', effectiveLength: function() { return 11; }});
        expect(a).toBe(null);

        var b = splitter.split({text: 'ook ook ook', effectiveLength: function() { return 11; }});
        expect(b).toBe('oo...'); 
     });

    it("splits at word when configured to", function() {

        var splitter = new Splitter(13, {default: 'word'});

        var a = splitter.split({text: 'ook ook ook', effectiveLength: function() { return 11; }});
        expect(a).toBe(null);

        var b = splitter.split({text: 'ook ook ook', effectiveLength: function() { return 11; }});
        expect(b).toBe('ook ...'); 
    });

    it("splits at line when configured to", function() {

        var splitter = new Splitter(13, {default: 'line'});

        var a = splitter.split({text: 'ook ook ook', effectiveLength: function() { return 11; }});
        expect(a).toBe(null);

        var b = splitter.split({text: 'ook ook\nook', effectiveLength: function() { return 11; }});
        expect(b).toBe('ook ook\n...'); 

    });

});
