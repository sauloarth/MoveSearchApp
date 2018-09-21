const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

let filmes = ["A Revolta"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/results", function(req, res){
    const busca = req.query.busca;
    console.log(busca);
    const endPoint = "http://www.omdbapi.com/?s="+ busca + "&apikey=thewdb";
    request(endPoint, function(error, response, body){
        if(!error && response.statusCode == 200) {
            filmes = JSON.parse(body).Search;
            res.render("results", {filmes:filmes});
        }
    })
})

app.get("/search", function(req, res){
    res.render("search");
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Move app is up!");
})