var express = require("express");
var app = express();


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


// support encoded bodies
app.listen(8080, () => {
    console.log("Server running on port 8080");
});





app.post('/echo',function(req,res){
    console.log(JSON.stringify(req.body));
    //console.log('request =' + JSON.stringify(req.body))
    //console.log(req.body);
    //var rssi = req.body.rssi;
    //console.log(rssi);
    //var user_name=req.body.user;
    //var password=req.body.password;
    //res.send(req.body);

    //console.log("User name = "+user_name+", password is "+password);
    //res.end("yes");
});