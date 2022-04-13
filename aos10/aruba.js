'use strict';
const WebSocket = require('ws');
const protobuf = require('protobufjs');
const arubaproto = require('./aruba-iot-nb-telemetry_pb').global;
const arubaproto1 = require('./aruba-iot-nb-action-results_pb');
const arubaproto2 = require('./aruba-iot-nb-ble-data_pb');

//const aruba_telemetry_proto = require('./myproto_libs.js').aruba_telemetry;


const wss = new WebSocket.Server({ port: 3001 });
// สร้าง websockets server ที่ port 4000
wss.on('connection', function connection(ws) { // สร้าง connection
  ws.on('message', function incoming(data, flags) {
    console.log('message');
    var bytes = Array.prototype.slice.call(data, 0);
    var message = proto.aruba_telemetry.BleData.deserializeBinary(bytes);
    console.log(message.toString());

  });

  ws.on('close', function close() {
    // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
      console.log('disconnected');
    });
    ws.send('init message to client');
    // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
  });