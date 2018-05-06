//setting up server.js with boiler plate code

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//adding the logger morgan - similar to example
var logger = require("morgan");
//using axios - similar to example
var axios = require("axios");

var cheerio = require("cheerio");

//require all models
var db = require('./models');


var PORT = process.env.PORT || 3000;

//initialize Express
var app = express();

//configure middleware

//use morgan logger for logging requests
app.use(logger("dev"));

//use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

//use express.static to serve the public folder
app.use(express.static("public"));


//connect to Mongo DB
mongoose.connect("mongodb://localhost/scraperdb");


//ROUTES


//a GET route for scraping the Bridgewater Patch website

app.get("/scrape", function (req, res) {
    //grab body of html with request
    //axios.get("https://patch.com/new-jersey/bridgewater")
    axios.get("https://www.nytimes.com/").then(function (response) {
        //then we load the html into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        //now grab every H2 within an article tag
        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this).children("a").text().trim();
            result.link = $(this).children("a").attr("href");
            console.log(result.link, "  ", result.title);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });

        });

        //if we werw able to succesfully scrape and save ARticle
        res.send("scrape complete");
    });
});



//start the server
app.listen(PORT, function () {
    console.log("App running on Port: ", PORT);
})