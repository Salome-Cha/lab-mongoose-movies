const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();
const Movie = require('../models/Movie')




// ACCESS THE LIST OF CELEBRITIES AND RENDER IN INDEX
router.get('/celebrities/index', (req, res, next) => {
Celebrity.find() 
  .then((allCelebritiesFromDB) => {
      console.log("Here is the output:", allCelebritiesFromDB)
      res.render('celebrities/index', {celebrities: allCelebritiesFromDB})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
  });


  // ACCESS THE FORM TO CREATE A NEW CELEBRITY
  router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
 })




// CREATE A NEW CELEBRITY IN THE "NEW" VIEW
router.post('/celebrities/new', (req, res) => {
  let {name, occupation, catchphrase} = req.body;
  console.log(req.body)
  Celebrity.create(
    {
    name,
    occupation,
    catchphrase
    })
    .then (() => {
    res.redirect('/celebrities/index')
}).
  catch(() =>
  res.render('celebrities/new'));
});

// REMOVE A CELEBRITY
router.post('/celebrities/:celebrityId/delete', (req, res) => {
  let celebrityId = req.params.celebrityId;
  Celebrity.findByIdAndDelete(celebrityId)
  .then(() => {
    res.redirect('/celebrities/index');
})
.catch((err) => {
  res.render('error', {err}) 
})
});

// ACCESS THE EDITING FORM
router.get('/celebrities/:celebrityId/edit', (req, res) => {
  let celebrityId = req.params.celebrityId;
  Celebrity.findById(celebrityId)
  .then((theCelebrityFound) => {
    res.render('celebrities/edit', {celebrity: theCelebrityFound})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
});


// PERSISTING THE CHANGE TO THE DB
router.post('/celebrities/:celebrityId/edit', (req, res) => {
  let celebrityId = req.params.celebrityId;
  let {name, occupation, catchphrase} = req.body;
  console.log(catchphrase);
  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchphrase
  })
  .then(() => {
    res.redirect('/celebrities/index');
  })
  .catch((err) => {
    res.render('/celebrities/:celebrityId/edit')
});
})



// ACCESS THE DETAIL OF A SPECIFIC CELEBRITY
router.get('/celebrities/:celebrityId', (req, res) => {
  let celebrityId = req.params.celebrityId;

  Celebrity.findById(celebrityId)
  .then((theCelebrityFound) => {
    res.render('celebrities/show', {celebrity: theCelebrityFound})
  })
  .catch((err) => {
    res.render('error', {err}) 
  })
})



module.exports = router;