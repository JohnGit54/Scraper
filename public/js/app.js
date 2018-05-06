

//grab the articles as a json
// $.getJSON("/articles", function (data) {
//     for (var i = 0; i < data.length; i++) {
//         // Display the apropos information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
// })

$(document).ready(function(){

    $("#newScrape").on("click", function(){
        $.ajax({
            url: "/scrape",
            method: "GET"
        }).then ( function(response){
            //console log if ajax worked
            console.log("Ajax scrape button\n", response);
            //res.render("index")
            

        })
    })



})