const Joi = require('joi');
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const { Genres } = require('../collections/genre');
const { Movies } = require('../collections/movies');
const { Rentals } = require('../collections/rentals');
var Fawn = require("fawn");

Router.get('/', function (req, res) {
  console.log('am here')
  res.status(200).send('welcome to Rentals version');
})

Router.post('/', async (req, res) => {
  const { error, value } = validateRental(req.body);
  console.log(value);
  if (!error) {
    try {
      const genre = await Genres.findById(value.genreId);
      const movie = await Movies.findById(value.movieId);
      if (movie.numberInStock == 0) {
        return res.send('Not enough movies in stock');
      }
      const rental = new Rentals({
        genre: {
          _id: genre._id,
          genre: genre.genre
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        }
      });
      Fawn.init(mongoose);
      new Fawn.Task()
      
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
          $inc: {
            numberInStock: -1
          }
        })
        .run();
      res.send(rental);
    }
    catch (e) {
      console.error(e)
    }
  }


})


function validateRental(rental) {
  const schema = {
    genreId: Joi.string().required(),
    movieId: Joi.string().required()
  }
  const { error, value } = Joi.validate(rental, schema);
  return { error, value }
}

module.exports = Router;