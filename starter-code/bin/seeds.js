const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.js');
const DB_NAME = 'movies';


mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const celebrities = [
  {
    name: "Matt Damon",
    occupation: "Actor",
    catchphrase: "I'm Jason Bourne"
  },
  {
  name: "Bob Dylan",
  occupation: "Singer",
  catchphrase: "It ain't me babe"
  },
  {
  name: "Georges Clooney",
  occupation: "Actor",
  catchphrase: "Confessions of a dangerous man"
  },
];


Celebrity.create(celebrities)
  .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} stars`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating stars from the DB: ${err}`));