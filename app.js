const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityQuery = req.body.cityName;
  const api = "5795f7b7b6a7ab63dbb5382006dcadde";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + api + "&units=" + unit + "";
  https.get(url, function (response) {
    console.log(response.statusCode);

    const cityUppercase = cityQuery.charAt(0).toUpperCase() + cityQuery.slice(1);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
      res.write("<p>The current weather condition is " + description + ".</p>");
      res.write("<h1>Current temperature in " + cityUppercase + " is " + temp + ".</h1>");
      res.write("<img src=" + iconUrl + " >");
      res.send();
    });
  });
});
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
