const WebSocket = require('ws');

const ws = new WebSocket('ws://10.10.99.105:8080/echo', {
  perMessageDeflate: false
});
var b1 = Buffer.from("help");
console.log(b1);
ws.on('open', function open() {
  ws.send(b1);
});

ws.on('message', function incoming(data) {
  console.log(data);
});
