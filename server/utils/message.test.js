var expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = 'User';
        var text = 'Some message';

        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});