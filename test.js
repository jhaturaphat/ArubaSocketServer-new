const data1 = [{
    "meta":{
    "version":"1","access_token":"1234","nbTopic":"telemetry"
    },"reporter":{
    "name":"20:4c:03:8b:86:fe","mac":"204c038b86fe","ipv4":"10.10.99.3","hwType":"AP-303H","swVersion":"8.7.1.6-8.7.1.6","swBuild":"81786","time":"1637655823"
    },"reported":[{
    "mac":"f008d155b4fe","deviceClass":["iBeacon","eddystone"],"model":"iBeacon","lastSeen":"1637655820","bevent":{"event":"update"},"rssi":{"last":-84},"beacons":[{"ibeacon":{"uuid":"783a69707094d0863b4a9bf94e555241","major":816,"minor":6,"power":0},"eddystone":{"power":0}}],"sensors":{"temperatureC":18,"voltage":3.299999952316284},"stats":{"uptime":"710","adv_cnt":"24","frame_cnt":7}},
    {"mac":"a0e6f8515eff","deviceClass":["arubaTag"],"firmware":{"bankA":"1.2-15"},"assetId":"0000-0000-0000","lastSeen":"1637655821","bevent":{"event":"update"},"rssi":{"last":-69},"sensors":{"battery":83},"stats":{"uptime":"82350","frame_cnt":3},"vendorName":"Aruba"}]}];
  
/*

    let myobj = JSON.stringify(data1);
    let obj = JSON.parse(myobj);
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
var a = 0;
for(var i = 0; i < 10;i++){
  a +=1;
    console.log(a);
}
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