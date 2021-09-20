const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/api.html")

});
app.post("/", function(req, res) {
  console.log(req.body.city);
  const query = req.body.city;
  const appid = "9e3ea32f9d0a65740075f40243058409";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + units;
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data" , function(data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdiscreption = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> current weather is " + weatherdiscreption + "<p>")
      res.write("<h1> weather tempreature is " + temp + "</h1>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("server starts");
});
