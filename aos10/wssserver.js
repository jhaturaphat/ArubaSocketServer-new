var mysql = require('mysql');
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const protobuf = require('protobufjs');
const aruba_telemetry_proto = require('./aruba_iot_proto.js').aruba_telemetry;

/*const server = new https.createServer({
  cert: fs.readFileSync('./fullchain1.pem'),
  key: fs.readFileSync('./privkey1.pem')
  //ca: fs.readFileSync('./isrgrootx1.cer')
});*/

const wss = new WebSocket.Server({
    ssl: true,
		port: 3003,
		ssl_key: './privkey1.pem',
    ssl_cert: './fullchain1.pem' });
//const port = '3003';
console.log("WSS Starting");
// สร้าง websockets server ที่ port 4000
wss.on('connection', function connection(ws) { // สร้าง connection
  console.log(connection)
  ws.on('message', function incoming(message) {
    console.log(message);
   // รอรับ data อะไรก็ตาม ที่มาจาก client แบบตลอดเวลา
    //console.log('received: %s', message);
    let telemetryReport = aruba_telemetry_proto.Telemetry.decode(message);
    //telemetryReport.toJSON();
    let myobj = JSON.stringify(telemetryReport);
    let obj = JSON.parse(myobj);
    //console.log(myobj);
    console.log(obj);
    //console.log(telemetryReport.body);
  });
ws.on('close', function close() {
  // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
    console.log('disconnected');
  });
ws.send('init message to client');
  // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้

});

/*
console.log(obj.reported[count]["deviceClass"]);
    console.log("===================================");
    if(obj.reported[count]["deviceClass"].includes('iBeacon')==true){
      console.log(obj.reported[count]["beacons"][0]['ibeacon']['uuid']);
      console.log('iBaecon');
    }
    if(obj.reported[count]["deviceClass"]=='arubaTag'){
      console.log('ArubaTag');
    }
*/
