var fs = require('fs');


/*const data = [
    123,  34, 104, 101,  97, 100, 101, 114,  34,  58, 123,  34,
    118, 101, 114, 115, 105, 111, 110,  34,  58,  34, 118,  49,
     34,  44,  34, 116, 111, 112, 105,  99,  34,  58,  50, 125,
     44,  34,  98, 111, 100, 121,  34,  58, 123,  34, 116, 101,
    108, 101, 109, 101, 116, 114, 121,  34,  58,  91, 123,  34,
    109, 101, 116,  97,  95, 100,  97, 116,  97,  34,  58, 123,
     34, 100, 101, 118, 105,  99, 101,  95, 116, 121, 112, 101,
     34,  58,  49,  44,  34, 105, 111, 116,  95, 100, 101, 118,
    105,  99, 101,  95];*/

// for an example first let's convert
//let buf;
var data = fs.readFileSync('./data.json');
//console.log("Synchronous read: " + data.toString());
/*var buf = Buffer.from(data);
var temp = buf.toString();*/
//let myobj = JSON.stringify(buf);
//let obj = JSON.parse(myobj);
//var buf = data.toString();
//var myobj = JSON.stringify(buf);
//let myobj = JSON.stringify(buf);
//let obj = JSON.parse(myobj);
let buf = Buffer.from(data);
let temp = buf.toString();
let obj = JSON.parse(temp);
//let myobj = JSON.stringify(temp);
//let obj = JSON.parse(myobj);

/*
Testing JSON Attributes
console.log(Object.keys(obj['body']['telemetry']).length);
console.log(obj['body']['telemetry'][71]['meta_data']['device_classes']);
console.log(obj['body']['telemetry'][71]['beacons'][0]['eddystone']['eddystone_tlm']);
console.log(obj['body']['telemetry'][5]['meta_data']['device_classes']);
console.log(obj['body']['telemetry'][5]['beacons'][0]);
console.log(obj['body']['telemetry'][197]['meta_data']);
console.log(obj['body']['telemetry'][197]['sensor_value']);
console.log(obj['body']['telemetry'][84]['beacons'][0]);*/

//console.log(Object.keys(obj['body']['telemetry'][71]['meta_data']['reporters']).length);
let line = Object.keys(obj['body']['telemetry']).length;
blelist(line, obj)


function blelist(jsonline, data){
    let sensorsvalue = {};
    for(let i=0; i<jsonline; i++){
        //console.log('iot-mac',base64ToHex(obj['body']['telemetry'][i]['meta_data']['iot_device_address']['iot_device_mac']));
        sensorsvalue['self_mac'] = base64ToHex(data['body']['telemetry'][i]['meta_data']['iot_device_address']['iot_device_mac']);
        //console.log(obj['body']['telemetry'][i]['meta_data']['reporters'][0]);
        //console.log(aplist(Object.keys(obj['body']['telemetry'][i]['meta_data']['reporters']).length, obj['body']['telemetry'][i]['meta_data']['reporters']));
        sensorsvalue['ap_list'] = aplist(Object.keys(data['body']['telemetry'][i]['meta_data']['reporters']).length, obj['body']['telemetry'][i]['meta_data']['reporters']);
        //console.log(obj['body']['telemetry'][i]['meta_data']['device_classes']);
        //console.log(category(obj['body']['telemetry'][i]['meta_data']['device_classes'],obj['body']['telemetry'][i]));
        sensorsvalue['values'] = category(data['body']['telemetry'][i]['meta_data']['device_classes'],data['body']['telemetry'][i]);
        //console.log(i);
        sensorsvalue['timestamp'] = Date.now();
        
        sensorsvalue['nearby'] = alignsignal(sensorsvalue);
        console.log(sensorsvalue);
        
    }
    
}

function alignsignal(data){
    let index;
    let apIndex = 100;
    //console.log(apIndex,'apIndex');
    let rssi = 0;
    let nearby = {};
    index = Object.keys(data['ap_list']['rssi']).length;
    for(let i=0; i<index; i++){
        if(rssi==0){
            rssi = data['ap_list']['rssi'][i];
            apIndex = i;

        }else if(rssi < data['ap_list']['rssi'][i]){
            rssi = data['ap_list']['rssi'][i];
            apIndex = i;
        }
    }
    if(apIndex!=100){
        nearby['apmac'] = data['ap_list']['apmac'][apIndex];
        nearby['rssi'] = data['ap_list']['rssi'][apIndex];
    }else{
        nearby['apmac'] = data['ap_list']['apmac'];
        nearby['rssi'] = data['ap_list']['rssi'];
    }
    return nearby;
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
    let unclassified = {};
    if(classify=='Eddystone'){
        eddystone['battery'] = data['beacons'][0]['eddystone']['eddystone_tlm']['battery_voltage'];
        eddystone['temperature'] = data['beacons'][0]['eddystone']['eddystone_tlm']['beacon_temperature'];
        eddystone['classify'] = 'Eddystone';
        return eddystone;
    }else if(classify=='ArubaAssetTag'){
        arubatag['battery'] = data['sensor_value']['battery'];
        arubatag['classify'] = 'ArubaAssetTag';
        return arubatag;
    }else if(classify=='iBeacon'){
        ibeacon['major'] = data['beacons'][0]['ibeacon_major'];
        ibeacon['minor'] = data['beacons'][0]['ibeacon_minor'];
        ibeacon['classify'] = 'iBeacon';
        return ibeacon;
    }else{
        unclassified['classify'] = 'unclassified';
        return unclassified;
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
