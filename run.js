var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
    res.render("index")
});

app.post("/game", function(req, res) {
    console.log(req.body.name);
    res.render("game")
})

app.listen(3000);
