const express = require("express");
const https = require("https");
const { join } = require("path");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});  

app.post("/", function(request, res){
  console.log(request.body.cityName);
   
   const city = request.body.cityName 
   const appId = "b868aa37316b6c6d4373e54a80c77948"
   const unit = "metric"
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",india&appid=" + appId + "&units=" + unit


    https.get(url, function(response){
         console.log(response);
           
         // This response.on method helps to get the data from the get.request 

         response.on("data", function(data){
            const weather_data = JSON.parse(data)

            // This stringify method converts json file into string 

           var info = (JSON.stringify(weather_data));
         //   console.log(info);

            const description = weather_data.weather[0]. description

            const temperature = weather_data.main.temp

            const icon = weather_data.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

          //  document.querySelector("p").innerHTML(info);


           // res.send("<h1>Temperature in Cuttack is " + temperature + " degree celcius.</h1>" )
            
            res.setHeader("Content-Type", "text/html");
            res.write("<h3>The weather is currently " + description + "</h3>" );
            res.write("<h1>Temperature in" + city + " is " + temperature + " degree celcius.</h1>");
            res.write("<img src = " + imgurl + ">");
            res.send() 
         });
    });  
 
})
app.listen(2000, function(){
    console.log("our server is running on port 2000");
});