const express = require('express');
const path = require('path');
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
let config = fs.readFileSync('config.json');
let initParams = JSON.parse(config);

const port = 3000;
let dbClient;


const mongoClient = new MongoClient("mongodb://localhost:27017/", {useNewUrlParser: false});

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

const jsonParser = express.json();


MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collectionBooks = client.db("library").collection("books");
    app.locals.collectionReqs = client.db("library").collection("requests");
    app.listen(port, () => {
        console.log("Server has started on " + port);
    });
});

app.get('/', (req, res) => {
    res.render('ukr/main', {
        name: initParams.name,
        domen: initParams.domen,
        image: initParams.image,
        bgcolor: initParams.bgcolor
    });
});

app.get('/aboutus', (req, res) => {
    res.render('ukr/aboutus', {
        name: initParams.name,
        domen: initParams.domen,
        bgcolor: initParams.bgcolor
    });
});

app.get('/books', (req, res) => {
    const collection = req.app.locals.collectionBooks;
    collection.find({}).toArray( (err, books) => {
        if(err) return console.log(err);

        res.render('ukr/books', {
            books,
            name: initParams.name,
            domen: initParams.domen,
            bgcolor: initParams.bgcolor
        });
    });
});

app.post("/request", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    const collection = req.app.locals.collectionReqs;
    const request = {
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment
    };
    collection.insertOne(request, function (err, result) {
        if(err) return console.log(err);
        res.send(result.ops[0]);
    });
});

app.get('/requests', (req, res) => {
   const collection = req.app.locals.collectionReqs;
   collection.find({}).toArray( (err, reqs) => {
       if(err) return console.log(err);

       res.render('ukr/requests', {reqs});
   });
});

app.get('/eng', (req, res) => {
    res.render('eng/main', {
        name: initParams.name,
        domen: initParams.domen,
        image: initParams.image,
        bgcolor: initParams.bgcolor
    });
});

app.get('/eng/aboutus', (req, res) => {
    res.render('eng/aboutus', {
        name: initParams.name,
        domen: initParams.domen,
        bgcolor: initParams.bgcolor
    });
});

app.get('/eng/books', (req, res) => {
    const collection = req.app.locals.collectionBooks;
    collection.find({}).toArray( (err, books) => {
        if(err) return console.log(err);

        res.render('eng/books', {
            books,
            name: initParams.name,
            domen: initParams.domen,
            bgcolor: initParams.bgcolor
        });
    });
});

app.post("/request", jsonParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    const collection = req.app.locals.collectionReqs;
    const request = {
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment
    };
    collection.insertOne(request, function (err, result) {
        if(err) return console.log(err);
        res.send(result.ops[0]);
    });
});

app.get('/eng/requests', (req, res) => {
    const collection = req.app.locals.collectionReqs;
    collection.find({}).toArray( (err, reqsEng) => {
        if(err) return console.log(err);
        res.render('eng/requests', {reqsEng});
    });
});

process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
