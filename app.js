//jshint esversion: 6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

//var apiKey = "78f73e56c6911d4dbb72073706de75fb-us21"; //Here your API key from Mailchimp
//var listID = "53606b4e37"; //Here your list id

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;

    const data = {
       members: [
           {
             email_address: email,
             status: "subscribed",
               merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName
               }
           }
       ]
    };
    //json.stringify() is useful for, say, converting an object to a string format
    // which enbales it to be sent as data to a server or for use in other
    // languages
    //When sending data to a web server, the data has to be a string.
    //json.parse() turns a string object back into a regular object
    const jsonData = JSON.stringify(data);

    const url ="https://us21.api.mailchimp.com/3.0/lists/53606b4e37";
    const options =  {
        method: "POST",
        auth: "yassine:5d464be4175ae04a67277ff82e270a70-us21"
    }

    const request = https.request(url, options, function(response){
       response.on("data", function(data){
           console.log((JSON.parse(data)));
       })
    })

    request.write(jsonData);
    request.end();


});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is listening on port 3000");
})
//5d464be4175ae04a67277ff82e270a70-us21







//last : 78f73e56c6911d4dbb72073706de75fb-us21
// Audience id: 53606b4e37

