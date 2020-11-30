const WebSocket = require('ws');
const protobuf = require("protobufjs");
const fs = require('fs');
const buf = Buffer.alloc(500);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(buf) {
//console.log('received: %s', message);
console.log(buf);
fs.writeFile('buffer.txt', buf, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
/*protobuf.load("awesome.proto", function(err, root) {
if (err)
    throw err;
var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");
var decode = AwesomeMessage.decode(new Uint8Array(message));
console.log(decode);
});*/
/*
    //var buff = message;
    protobuf.load("awesome.proto", function(err, root) {
    if (err)
        throw err;

    // Obtain a message type
    var AwesomeMessage = root.lookupType("awesomepackage.AwesomeMessage");

    // Exemplary payload
    var payload = { awesomeField: message };

    // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
    var errMsg = AwesomeMessage.verify(payload);
    if (errMsg)
        throw Error(errMsg);

    // Create a new message
    var message = AwesomeMessage.create(payload); // or use .fromObject if conversion is necessary

    // Encode a message to an Uint8Array (browser) or Buffer (node)
    //var buffer = AwesomeMessage.encode(message).finish();
    // ... do something with buffer

    // Decode an Uint8Array (browser) or Buffer (node) to a message
    var message = AwesomeMessage.decode(message);
    // ... do something with message
    console.log(message);
    // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

    // Maybe convert the message back to a plain object
    var object = AwesomeMessage.toObject(message, {
        longs: String,
        enums: String,
        bytes: String,
        // see ConversionOptions
    });
});*/
    //console.log('received: ', message.toString('utf8'));
    //message.setEncoding("utf8");
    //var buf = Buffer.from(message);
    //var json = JSON.stringify(buf);

//    console.log(json);

  });

  //ws.send('Server Send Somthing');
});
async function decodeTestMessage(buffer) {
    const root = await protobuf.load("awesome.proto");
    const testMessage = root.lookupType("awesomepackage.testMessage");
    const err = testMessage.verify(buffer);
    if (err) {
        throw err;
    }
    const message = testMessage.decode(buffer);
    return testMessage.toObject(message);
}
