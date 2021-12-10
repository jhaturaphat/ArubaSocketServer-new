var mysql = require('mysql');
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
      console.log(myobj);
      console.log(obj["reporter"]["name"]);
      //console.log(obj["reporter"]["ipv4"]);
      console.log(obj["reported"]);
      //console.log(obj.reported);
      add_sensors(obj["reporter"]["name"], obj.reported);
      //console.log(obj.reported[0]["deviceClass"]);
      /*let count=0;
      for (k of obj.reported) {
        console.log(obj.reported[count]["deviceClass"]);
        console.log("===================================");
        if(obj.reported[count]["deviceClass"].includes('iBeacon')==true){
          console.log(obj.reported[count]["beacons"][0]['ibeacon']['uuid']);
          console.log('iBaecon');
        }
        if(obj.reported[count]["deviceClass"]=='arubaTag'){
          console.log('ArubaTag');
        }
        count +=1;
      }*/
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

function add_sensors(location, sensor){
  let count=0;
  for (k of sensor) {
    console.log("===================================");
    if(sensor[count]["deviceClass"].includes('iBeacon')==true&&sensor[count]["deviceClass"].includes('arubaBeacon')==false&&sensor[count]['rssi']!=null){
      let sql = "";
      let param = {};
      param[0] = sensor[count]['mac'];
      param[1] = 'iBeacon';
      console.log(sensor[count]['rssi']['last']);
      param[2] = sensor[count]['rssi']['last'];
      param[3] = new Date().toISOString();
      param[4] = sensor[count]["beacons"][0]['ibeacon']['major'];
      param[5] = sensor[count]["beacons"][0]['ibeacon']['minor'];
      sql = "INSERT INTO sensors (s_mac_address, s_device_type, s_minor, s_major, s_rssi, s_timestamp, s_location) VALUES ('"+param[0]+"', '"+param[1]+"', "+param[5]+", "+param[4]+", "+param[2]+", "+'NOW()'+", '"+location+"')";
      add_db(sql);
    }
    else if(sensor[count]["deviceClass"]=='arubaTag'&&sensor[count]['rssi']!=null){
      let sql = "";
      let param = {};
      param[0] = sensor[count]['mac'];
      param[1] = 'arubaTag';
      console.log(sensor[count]['rssi']['last']);
      param[2] = sensor[count]['rssi']['last'];
      param[3] = new Date().toISOString();
      param[4] = sensor[count]['sensors']['battery'];
      sql = "INSERT INTO sensors (s_mac_address, s_device_type, s_battery, s_rssi, s_timestamp, s_location) VALUES ('"+param[0]+"', '"+param[1]+"', "+param[4]+", "+param[2]+", "+'NOW()'+", '"+location+"')";
      add_db(sql);

    }else if(sensor[count]["deviceClass"]=='eddystone'&&sensor[count]['rssi']!=null){
      let sql = "";
      let param = {};
      param[0] = sensor[count]['mac'];
      param[1] = 'eddystone';
      param[2] = sensor[count]['rssi']['last'];
      param[3] = new Date().toISOString();
      param[4] = sensor[count]['sensors']['temperatureC'];
      sql = "INSERT INTO sensors (s_mac_address, s_device_type, s_dynamic_value, s_rssi, s_timestamp, s_location) VALUES ('"+param[0]+"', '"+param[1]+"', "+param[4]+", "+param[2]+", "+'NOW()'+", '"+location+"')";
      add_db(sql);
    }
    count +=1;
  }
}

function add_db(sql){
  var con = mysql.createConnection({
    host: "10.5.255.31",
    user: "root",
    password: "password",
    database: "iot"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!");
    //var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Insert Data >> "+sql);
      con.end();
      console.log("Closed Connections");
    });
  });

}

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