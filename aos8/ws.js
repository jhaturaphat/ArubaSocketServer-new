// Minimal amount of secure websocket server
var mysql = require('mysql');
var fs = require('fs')
const protobuf = require('protobufjs');
const aruba_telemetry_proto = require('./aruba_iot_proto.js').aruba_telemetry;

// read ssl certificate
var privateKey = fs.readFileSync('privkey1.pem', 'utf8')
var certificate = fs.readFileSync('fullchain1.pem', 'utf8')

var credentials = { key: privateKey, cert: certificate }
var https = require('https')

//pass in your credentials to create an https server
var httpsServer = https.createServer(credentials)
httpsServer.listen(3003)

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({
  server: httpsServer
})

httpsServer.on('request', (req, res) => {
  console.log(req)
  res.writeHead(200);
  res.end('hello HTTPS world\n');
});

wss.on('connection', function connection(ws) {
  //console.log(ws)
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message)
    //let myobj = JSON.stringify(message);
    //let obj = JSON.parse(message);
    let buf = Buffer.from(message);
// Append data to file
    //fs.appendFileSync('./data.json', buf);
    //console.log("Data is appended to file successfully.")
    let temp = buf.toString();
    let obj = JSON.parse(temp);
    //let myobj = JSON.stringify(temp);
    //let obj = JSON.parse(myobj);
    console.log(obj);
    let line = Object.keys(obj['body']['telemetry']).length;
    console.log(line);
    blelist(line, obj)
    ws.send('reply from server : ' + message)
  })

  ws.send('something')
})

function blelist(jsonline, data){
  let sensorsvalue = {};
  for(let i=0; i<jsonline; i++){
      //console.log('iot-mac',base64ToHex(obj['body']['telemetry'][i]['meta_data']['iot_device_address']['iot_device_mac']));
      sensorsvalue['self_mac'] = base64ToHex(data['body']['telemetry'][i]['meta_data']['iot_device_address']['iot_device_mac']);
      //console.log(obj['body']['telemetry'][i]['meta_data']['reporters'][0]);
      //console.log(aplist(Object.keys(obj['body']['telemetry'][i]['meta_data']['reporters']).length, obj['body']['telemetry'][i]['meta_data']['reporters']));
      sensorsvalue['ap_list'] = aplist(Object.keys(data['body']['telemetry'][i]['meta_data']['reporters']).length, data['body']['telemetry'][i]['meta_data']['reporters']);
      //console.log(obj['body']['telemetry'][i]['meta_data']['device_classes']);
      //console.log(category(obj['body']['telemetry'][i]['meta_data']['device_classes'],obj['body']['telemetry'][i]));
      sensorsvalue['values'] = category(data['body']['telemetry'][i]['meta_data']['device_classes'],data['body']['telemetry'][i]);
      //console.log(i);
      sensorsvalue['timestamp'] = Date.now();
      console.log(sensorsvalue);
  }
}

function aplist(aplist, data){
  let apmac = {};
  let rssi = {};
  for(let i=0; i<aplist; i++){
      //console.log(data[i]['ap_mac_address'],"APDATA");
      apmac[i] = base64ToHex(data[i]['ap_mac_address']);
      rssi[i] = data[i]['rssi_from_device'];
      
  }
  return {apmac: apmac, rssi: rssi};
}

function category(classify, data){
  let eddystone = {};
  let arubatag = {};
  let ibeacon = {};
  if(classify=='Eddystone'){
      eddystone['battery'] = data['beacons'][0]['eddystone']['eddystone_tlm']['battery_voltage'];
      eddystone['temperature'] = data['beacons'][0]['eddystone']['eddystone_tlm']['beacon_temperature'];
      //eddystone['classify'] = 'Eddystone';
      return eddystone;
  }else if(classify=='ArubaAssetTag'){
      arubatag['battery'] = data['sensor_value']['battery'];
      //arubatag['classify'] = 'ArubaAssetTag';
      return arubatag;
  }else if(classify=='iBeacon'){
      ibeacon['major'] = data['beacons'][0]['ibeacon_major'];
      ibeacon['minor'] = data['beacons'][0]['ibeacon_minor'];
      //ibeacon['classify'] = 'iBeacon';
      return ibeacon;
  }else{
      return 'NonCategory';
  }
  
}

function base64ToHex(str) {
  const raw = atob(str);
  let result = '';
  let count = 1;
  let len = 1;
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
    //console.log(result,count)
    if(count==1&&len!=6){
      result = result.concat(':')
      count=0;
    }
    count++;
    len++;

  }
  //return result.toUpperCase();
  return result
}
