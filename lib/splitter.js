
module.exports = function(maxLength, options) {
    options = options || {default: 'char'};

    var currentLength = 0,
        currectTag = null;

    this.split = function(tag) {

        var _currentTag = tag.getTag && tag.getTag();
        if (_currentTag) currentTag = _currentTag;

        currentLength += tag.effectiveLength();

        if (currentLength > maxLength) {
            // Get where we should split from the options, or failing that the default.
            var splitAt = options[currentTag] || options.default;
            console.log(currentTag);
            console.log(splitAt);

            // Time to split
            switch(splitAt) {
                case 'char': 
                    return tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength)) + '...';
                case 'word':
                    var chop = tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength));
                    var re = new RegExp(chop + '\\S*');
                    var match = re.exec(tag.text);

                    return match && match[0] + ' ...';
                case 'line':
                    var chop = tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength));
                    var re = new RegExp(chop + '.*[\n\r]');
                    var match = re.exec(tag.text);

                    return match && match[0] + '...';
            }
        }

        return null;
    };
};
