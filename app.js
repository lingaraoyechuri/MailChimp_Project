const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));
//var path = require('path');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});



app.post('/', (req, res) => {

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email =  req.body.email;

  const data = {
    members: [
      {
        email_address : email,
        status : "subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName

        }
      }
    ]
  };


 const jsonData = JSON.stringify(data);

 //https://usX.api.mailchimp.com/3.0/lists/57afe96172/members/62eeb292278cc15f5817cb78f7790b08/notes
 const url = "https://us7.api.mailchimp.com/3.0/lists/8ff6703c38";
 const options = {
   method : "POST",
   auth: "linga1:541db5eec1d68fa1e1f4e5e9dddc976e-us7"
 }

 const request = https.request(url, options, function(response){
  console.log(response.statusCode);
  if(response.statusCode == 200){
     //res.sendFile(__dirname + '/sucess.html');
     res.sendFile(__dirname + '/failure.html');
  }
  else {
    res.sendFile(__dirname + '/failure.html');
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })



 })

 request.write(jsonData);
 request.end();
  //541db5eec1d68fa1e1f4e5e9dddc976e-us7
  //8ff6703c38
   //console.log(req.body);
  // res.send("the value is "+ req.body.firstName + req.body.firstName + req.body.firstName );
});


app.post('/failure', (req, res) => {

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {

  console.log("server is running");
});
