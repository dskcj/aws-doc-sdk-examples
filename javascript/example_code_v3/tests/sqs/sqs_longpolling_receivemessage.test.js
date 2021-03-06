process.argv.push('--arg1', 'eu-west-1');
process.argv.push('--arg2', 'SQS_QUEUE_URL');

const mockReceiveMessagesLP = jest.fn();
jest.mock('@aws-sdk/client-sqs/commands/ReceiveMessageCommand', () => ({
    SQS: function SQS() {
        this.ReceiveMessageCommand = mockReceiveMessagesLP
    }
}));
const {run} = require("../../sqs/sqs_longpolling_receivemessage.js");

//test function
test("has to mock SQS#longpolling_receivemessage",  async (done) => {
    await run();
    expect(mockReceiveMessagesLP).toHaveBeenCalled;
    done();
});
