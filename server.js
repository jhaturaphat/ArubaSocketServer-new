const WebSocket = require('ws');
const protobuf = require('protobufjs');
const aruba_telemetry_proto = require('./aruba_iot_proto.js').aruba_telemetry;


const wss = new WebSocket.Server({ port: 3001 });
// สร้าง websockets server ที่ port 4000
wss.on('connection', function connection(ws) { // สร้าง connection
  ws.on('message', function incoming(message) {

   // รอรับ data อะไรก็ตาม ที่มาจาก client แบบตลอดเวลา
    //console.log('received: %s', message);
    let telemetryReport = aruba_telemetry_proto.Telemetry.decode(message);
    //telemetryReport.toJSON();
    let myobj = JSON.stringify(telemetryReport);
    let obj = JSON.parse(myobj);
    //console.log(myobj);
    
    if(obj["reported"]==null){
      console.log("Aruba Websocket Established");
    }else{
      console.log(obj["reporter"]["name"]);
      console.log(obj["reporter"]["ipv4"]);
      console.log(obj["reported"]);
      beacon(obj["reported"]);
    if(obj["reported"]["deviceClass"]=='arubaTag'){
      console.log(obj["reported"]["rssi"]);
      console.log(obj["reported"]["sensors"]);
    }
    }
    //console.log(telemetryReport.body);
  });
ws.on('close', function close() {
  // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
    console.log('disconnected');
  });
ws.send('init message to client');
  // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
});
async function beacon(report){
  var c = 0;
  for (k of report) {
    c += 1;
    console.log(c);
    console.log(k.beacons);
}
}