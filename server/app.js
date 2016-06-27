var express = require('express');
var app=express();
var path = require('path');
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect('localhost:27017/weekend5assignment');

var ourSchema = new  mongoose.Schema({
  name: String,
  animal: String,
  age: Number,
  image: String
});
var ourPets = mongoose.model( 'ourPets', ourSchema );

// base url
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.get('/addPets', function (req, res) {
  res.sendFile(path.resolve('views/addPets.html'));
});//end of add pets html function

app.get('/seePets', function (req, res) {
  res.sendFile(path.resolve('views/seePets.html'));
});//end of see pets html function

app.get('/seePhotos', function (req, res) {
  res.sendFile(path.resolve('views/seePhotos.html'));
});//end of see photos function

// get call
app.get( '/getPets', function( req, res ){
  ourPets.find()
  .then( function( data ){
    res.send( data );
  });
});//End of getpets function

// post call
app.post( '/petPost', function( req, res ){
  console.log( 'req.body: ' + req.body.name );
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var petToAdd={
    name: req.body.name,
    animal: req.body.animal,
    age: req.body.age,
    image: req.body.image
  };
  // Saves the data to the database
  var newPet=ourPets( petToAdd );
  newPet.save();
});

// spin up server
app.listen( 8080, 'localhost', function( req, res ){
  console.log( 'listening on 8080' );
});

// static folder
app.use( express.static( 'public' ) );
