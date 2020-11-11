const mongoose = require('mongoose');
const Movie = require('../models/Movie.js');
const DB_NAME = 'movies';


mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const movies = [
  {
    title: "Jason Bourne",
    genre: "Thriller",
    plot: "It's been 10 years since Jason Bourne walked away from the agency that trained him to become a deadly weapon. "
  },
  {
    title: "The Departed",
    genre: "Action",
    plot: "South Boston cop Billy Costigan goes under cover to infiltrate the organization of gangland chief Frank Costello.  "
  },
  {
    title: "Up in the Air",
    genre: "Drama",
    plot: "The story is centered on corporate Ryan Bingham and his travels."
  },
];


Movie.create(movies)
  .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from seed file: ${err}`));