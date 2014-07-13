describe('tokenizer', function() {

  var tokenizer = require('../lib/tokenizer');
  
  it('tokenizes everything in angle brackets', function() {

    var tokens = tokenizer('<oook><ponk>');

    expect(tokens()).toEqual({content: '<oook>', token: 'tag'});
    expect(tokens()).toEqual({content: '<ponk>', token: 'tag'});
  });

  it('tokenizes text between tags', function() {

    var tokens = tokenizer('<oook>arf<ponk>');

    expect(tokens()).toEqual({content: '<oook>', token: 'tag'});
    expect(tokens()).toEqual({content: 'arf', token: 'text'});
    expect(tokens()).toEqual({content: '<ponk>', token: 'tag'});
  });

  it('tokenizes end tags', function() {

    var tokens = tokenizer('</erkle>');

    expect(tokens()).toEqual({content: '</erkle>', token: 'endtag'});
  });

  it('tokenizes loner tags', function() {

    var tokens = tokenizer('<erkle />');

    expect(tokens()).toEqual({content: '<erkle />', token: 'lonertag'});

  });

});
