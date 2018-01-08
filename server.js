var express = require("express");
var path = require("path");
var router = express.Router();
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var http = require("http");
var https = require("https");
var url = require("url");
var fs = require("fs");
var app = express();

app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Mongo Connect
var BooksMongoClient = require('mongodb').MongoClient;
var books = require("./modules/books")(app, BooksMongoClient);

app.listen(3000, function(){
    console.log("Server is running");
});

/**
 * npm install express path morgan cookie-parser body-parser http https url fs --save
 */