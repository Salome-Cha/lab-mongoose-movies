const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();
const Movie = require('../models/Movie')


// ACCESS THE LIST OF CELEBRITIES AND RENDER IN INDEX
router.get('/movies/index', (req, res, next) => {
    Movie.find() 
      .then((allMoviesFromDB) => {
          console.log("Here are the list of movies from DB:", allMoviesFromDB)
          res.render('movies/index', {movies: allMoviesFromDB})
      })
      .catch((err) => {
        res.render('error', {err}) 
      })
      });
    

// CREATE NEW MOVIES
router.get('/movies/new', (req, res) => {
    Celebrity.find()
    .then((celebrityFromDB) => {
      res.render('movies/new', {celebrities: celebrityFromDB})
    })
  });
  
//PERSIST CREATION IN DATABASE
router.post('/movies/new', (req, res) => {
let {title, genre, plot, celebrity} = req.body;
  Movie.create(
    {
    title,
    genre,
    plot,
    celebrity
    })
    .then (() => {
    res.redirect('/movies/index')
}).
  catch(() =>
  res.render('movies/new'));
});


// EDIT // ACCESS THE FORM TO EDIT MOVIES
router.get('/movies/:movieId/edit', (req, res) => {
    let movieId = req.params.movieId;
    Movie.findById(movieId)
    .populate('celebrity')
    .then((specificMovie) => {
        Celebrity.find()
        .then((celebritiesFromDB) => {
        //console.log('The movie is', specificMovie)
        res.render('movies/edit', 
        {
        movie: specificMovie, 
        celebrities: celebritiesFromDB
        });
    });
    })
    .catch((err) => {
        res.render('error', {err}) 
      })
});

// PERSISTING THE CHANGE TO THE DB
router.post('/movies/:movieId/edit', (req, res) => {
    let movieId = req.params.movieId;
    let {title, genre, plot, celebrity} = req.body;
    
    Movie.findByIdAndUpdate(movieId, {
        title,
        genre,
        plot,
        celebrity
    })
    .then(() => {
      res.redirect('/movies/index');
    })
    .catch((err) => {
      res.render('/movies/:movieId/edit')
  });
  })
  
  
// DELETE A MOVIE FROM DB
router.post('/movies/:movieId/delete', (req, res) => {
    let movieId = req.params.movieId;
    
    Movie.findByIdAndDelete(movieId)
        .then(() => {
            res.redirect('/movies/index')
        })
        .catch((err) => {
            res.render('error', {err}) 
          });
    });
    
    

// ACCESS THE DETAIL OF A SPECIFIC MOVIE
router.get('/movies/:movieId', (req, res) => {
    let movieId = req.params.movieId;
  
Movie.findById(movieId)
  .populate()
    .then((theMovieFound) => {
        console.log(theMovieFound)
      res.render('movies/show', {movie: theMovieFound})
    })
    .catch((err) => {
      res.render('error', {err}) 
    })
  })
  


module.exports = router;