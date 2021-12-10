var mysql = require('mysql');
const data1 = {"meta":{"version":"1","access_token":"1234","nbTopic":"telemetry"},"reporter":{"name":"Gaming-Room","mac":"204c038b86fe","ipv4":"192.168.1.155","ipv6":"fe80::224c:3ff:fe8b:86fe","hwType":"AP-303H","swVersion":"8.7.1.6","swBuild":"81786","time":"1639126691"},
"reported":[
  {"mac":"f008d155b65e","deviceClass":["iBeacon"],"model":"iBeacon","lastSeen":"1639126660","bevent":{"event":"update"},"beacons":[{"ibeacon":{"uuid":"783a69707094d0863b4a9bf94e555241","major":214,"minor":87,"power":0}}],"stats":{"frame_cnt":0}},
  {"mac":"f008d155b4fe","deviceClass":["eddystone"],"lastSeen":"1639126689","bevent":{"event":"update"},"rssi":{"last":-77},"beacons":[{"eddystone":{"power":0}}],"sensors":{"temperatureC":71,"voltage":3.299999952316284},"stats":{"uptime":"67420","adv_cnt":"75","frame_cnt":7}},
  {"mac":"a0e6f8515eff","deviceClass":["arubaTag"],"firmware":{"bankA":"1.2-15"},"assetId":"0000-0000-0000","lastSeen":"1639126678","bevent":{"event":"update"},"rssi":{"last":-69},"sensors":{"battery":92},"stats":{"uptime":"84450","frame_cnt":3},"vendorName":"Aruba"},
  {"mac":"0cae7dbffd5f","deviceClass":["iBeacon","arubaBeacon"],"model":"BT-AP300H","firmware":{"bankA":"0.0-0","bankB":"1.2-42"},"lastSeen":"1639125487","bevent":{"event":"update"},"beacons":[{"ibeacon":{"uuid":"4152554ef99b4a3b86d0947070693a78","major":0,"minor":0,"power":-56}}],"txpower":14,"sensors":{"battery":-101},"stats":{"uptime":"10740","frame_cnt":0},"vendorName":"Aruba"}]}
  


    let myobj = JSON.stringify(data1);
    let obj = JSON.parse(myobj);
    //console.log(obj);
    
    if(obj["reported"]==null){
      console.log("Aruba Websocket Established");
    }else{
      console.log(obj["reporter"]["name"]);
      console.log(obj["reporter"]["ipv4"]);
      sensor = obj.reported;
      //console.log(obj["reported"]);
      //console.log(obj.reported[0]["deviceClass"]);
      let count=0;
      for (k of sensor) {
        console.log(sensor[count]["deviceClass"]);
        console.log("===================================");
        if(sensor[count]["deviceClass"].includes('iBeacon')==true&&sensor[count]["deviceClass"].includes('arubaBeacon')==false){
          console.log(sensor[count]['mac']);
          if(sensor[count]['rssi']==null){
            console.log("Skipped");
          }else{
            console.log(sensor[count]['rssi']['last']);
          }
          
          
        }
        else if(sensor[count]["deviceClass"]=='arubaTag'){
          let mac = sensor[count]['mac'];
          let devicetype = 'arubaTag';
          let rssi = mac = sensor[count]['rssi']['last'];
          console.log(rssi);
          let date = new Date().toISOString();
          let battery = sensor[count]['sensors']['battery'];
          console.log(battery);
        }
        else if(sensor[count]["deviceClass"]=='eddystone'){
          let mac = sensor[count]['mac'];
          let devicetype = 'eddystone';
          let rssi = mac = sensor[count]['rssi'];
          let date = new Date().toISOString();
          let dyn_value = sensor[count]['sensors']['temperatureC'];
          console.log(dyn_value);
          let v = {};
          v[0] = "a";
          v[1] = "b";
          console.log(v[1],v[0]);
        }
        count +=1;
      }
    }

    
/*
var con = mysql.createConnection({
  host: "10.5.255.31",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.end();
});*/




/*
    let abc = "";
    for (k of obj) {
       console.log(k.reported);

  }
    //ActionResult(data1);
    function ActionResult(properties) {
      if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          //console.log(properties);
              if (properties[keys[i]] != null)
              console.log(properties[keys[i]]);
                  this[keys[i]] = properties[keys[i]];
  }

*/
  //================output================//
  /*
  const data = data1.filter(d => d.mac == "f008d155b4fe");
  const checkType = data.map(i => i.deviceClass[0]);
  let checkType1 = checkType.toString();
  if(checkType1==='iBeacon'){
    console.log(checkType1);
  }
  
  
  try{
  const checkType = data.map(i => i.deviceClass[0])
  let checkType1 = checkType.toString();
  if(checkType1==='iBeacon'){
  const newVar = data.map(i => i.beacons[0]);
  console.log('arr1', data,newVar);
  }else{
    console.log('arr1', data);
  }
}catch(error){
    console.error(error);
}*/
//================output================//

  //const arr2 = data.filter(d => d.gender === 'female');
  //console.log('arr2', arr2);
  
  //const ageAndGender = d => d.age > 37 && d.gender === 'female';
  
  //const arr3 = data.filter(ageAndGender);
  //console.log('arr3', arr3);