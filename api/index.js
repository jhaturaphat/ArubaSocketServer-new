const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken')
const secret = 'forgetme!'
require('dotenv').config()

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    host: "10.5.255.32",
    password: "password",
    database: "Traxzi"
})

app.post('/websocketaos10/sensorvaluesinsert', (req,res) =>{
    try{
        //console.log(req.body.sensorsvalue);
        //console.log(req.body);
        inventory_sensor(req.body.sensorsvalue);
        tracing_device(req.body.sensorsvalue);
        triangle_sensor(req.body.sensorsvalue);
        //ws();
        //res.send(req.params.sensorsvalue);
    res.sendStatus(200);
    }catch(err){
        res.sendStatus(500);
    }
    //db.close();
});

app.get('/websocketaos10/inventory_device', (req,res) =>{
    db.query('SELECT invenMac,invenName FROM inventory_sensor', (err, result) => {
        if (err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

function inventory_sensor(data){
    db.query('UPDATE inventory_sensor SET `invenType`=?, `invenLocation`=?, `invenRssi`=?, `invenMajor`=?, `invenMinor`=?, `invenTemp`=ROUND(?,1), `invenBattery`=?, `invenTimestamp`=NOW()   WHERE invenMac = ?;', 
    [data['values']['classify'],data['nearby']['apmac'], data['nearby']['rssi'], 
    data['values']['major'], data['values']['minor'], 
    data['values']['temperature'], data['values']['battery'], data['self_mac']],
    (err,result) =>{
        if(err){
            console.log(err);
        }else{
            return "Device Updated";
        }
    });
}

function tracing_device(data){
    db.query('INSERT INTO tracing_device (tdName,tdMac,tdLocation,tdRssi,tdMajor,tdMinor,tdTemp,tdBattery,tdTimestamp) VALUES (?,?,?,?,?,?,ROUND(?,1),?,NOW())',
    [data['invenName'], data['self_mac'], data['nearby']['apmac'], data['nearby']['rssi'], data['values']['major'],
    data['values']['minor'],data['values']['temperature'],data['values']['battery']],
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            return "Tracing Device Inserted";
        }
    });
}

function triangle_sensor(data){
    db.query('INSERT INTO triangle_sensor (tsName,tsMac,tsLocation_1,tsLocation_2,tsLocation_3,tsRssi_1,tsRssi_2,tsRssi_3,tsTimestamp) VALUES (?,?,?,?,?,?,?,?,NOW())',
    [data['invenName'], data['self_mac'], data['ap_list']['apmac']['0'], data['ap_list']['apmac']['1'], data['ap_list']['apmac']['2'],
    data['ap_list']['rssi']['0'],data['ap_list']['rssi']['1'],data['ap_list']['rssi']['2']],
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            return "Tracing Device Inserted";
        }
    });
}


app.listen( process.env.PORT,() => {
    console.log("Server is running on port "+process.env.PORT);
})