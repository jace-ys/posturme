const express = require('express'),
      app = express(),
      bodyParser = require("body-parser");

app.use(bodyParse.urlencoded({extended: true}));

let points = 0;
let percentages [];

//Retrieve scores
app.get("/", function(req, res){
  res.send({points:points, percentages:percentages});
});

//Post a new score
app.post("/", function(req, res){
  points = points + req.body.points;
  percentagees.push(req.body.percentage);
});

const port = 80;
app.listen(port, function(){
  console.log("Posturme is a GO!!!")
});
