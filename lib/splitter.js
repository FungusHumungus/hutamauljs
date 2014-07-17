
module.exports = function(maxLength, options) {
    options = options || {default: 'char'};

    var currentLength = 0;

    this.split = function(tag) {

        currentLength += tag.effectiveLength();

        if (currentLength > maxLength) {
            // Time to split
            if (options.default === 'char') {
                return tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength)) + '...';
            } else if (options.default === 'word') {
                var chop = tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength));
                var re = new RegExp(chop + '\\S*');
                var match = re.exec(tag.text);

                return match && match[0] + ' ...';
            } else if (options.default === 'line') {
                var chop = tag.text.substring(0, tag.effectiveLength() - (currentLength - maxLength));
                var re = new RegExp(chop + '.*[\n\r]');
                var match = re.exec(tag.text);

                return match && match[0] + '...';

            }

        }

        return null;
    };
};
