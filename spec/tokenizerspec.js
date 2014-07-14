describe('tokenizer', function() {

  var tokenizer = require('../lib/tokenizer');
  
  it('tokenizes everything in angle brackets', function() {

    var tokens = tokenizer('<oook><ponk>');

    expect(tokens()).toEqual({content: '<oook>', type: 'tag'});
    expect(tokens()).toEqual({content: '<ponk>', type: 'tag'});
  });

  it('tokenizes text between tags', function() {

    var tokens = tokenizer('<oook>arf<ponk>');

    expect(tokens()).toEqual({content: '<oook>', type: 'tag'});
    expect(tokens()).toEqual({content: 'arf', type: 'text'});
    expect(tokens()).toEqual({content: '<ponk>', type: 'tag'});
  });

  it('tokenizes end tags', function() {

    var tokens = tokenizer('</erkle>');

    expect(tokens()).toEqual({content: '</erkle>', type: 'endtag'});
  });

  it('tokenizes loner tags', function() {

    var tokens = tokenizer('<erkle />');

    expect(tokens()).toEqual({content: '<erkle />', type: 'lonertag'});

  });

  it('tokenizes tags with attributes', function() {

    var tokens = tokenizer('<wonk arg="sponk" onk="ponk"></wonk>');
    expect(tokens()).toEqual({content: '<wonk arg="sponk" onk="ponk">', type: 'tag'});

  });

});
