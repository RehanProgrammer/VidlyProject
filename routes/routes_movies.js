const Joi = require('joi');
const movies = require('../collections/movies')

module.exports = function(app){
    const films = new movies();

    app.get('/',(req,res)=>{
        res.send('welcome to my movies website');
    });

  app.get('/api/movies',(req,res)=>{
        films.getMovies()
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(400).send(err.detals[0].messege);
        });
  });

  app.post('/api/movies',(req,res)=>{
      const { error , value } = validateMovie(req.body);
      if (!error){
        films.createMovie(value.title,value.genreId,value.numberInStock,value.dailyRentalRate)
        .then(res=>{
            res.status(200).send(`${res} has been posted`);
        })
        .catch(err=>{
            res.status(400).send(err.detals[0].messege);
        })
      }
  })
}//end of function

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(4).required(),
        genreId: Joi.string().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    }
     const {error , value} = Joi.validate(movie,schema);
     return { error , value };
}