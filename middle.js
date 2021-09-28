var express = require('express');
var config =require("config");
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}
var requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
  }
app.use(myLogger);
app.use(requestTime);

app.get('/', function (req, res) {
  res.send('Hello World!');
})
app.listen(3000,()=>{
    console.log("listen to port");
});
console.log("customer name:"+config.get("name"));
console.log("customer name:"+config.get("email.host"));
console.log("customer name:"+config.get("gender"));
