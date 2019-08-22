const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const {Genres} = require('./genre');

//const database = 'mongodb://localhost/Genre';

/*mongoose.connect(database,{ useNewUrlParser: true })
.then(()=> {
    console.log('mongo database connected from movies');
})
.catch((err)=>{
    console.error('Error:' + err);
});*/

const movieSchema = new mongoose.Schema({
    title: {
        type:String,
        minlength: 4,
        maxlength: 100
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock:{
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required:true
    }
});

const Movies = mongoose.model('movies', movieSchema);

class Movie {
    
    async createMovie(title,genreId,numberInStock,dailyRentalRate){
        //get the genre by calling the genre collection
        const genres = await Genres.findById(genreId);
        console.log(genres);
        const movies = new Movies({
            title,
            genre:{
                _id: genres._id,
                genre: genres.genre
            },
            numberInStock,
            dailyRentalRate
        })
      return  await movies.save()
        .then(res=>{
           console.log(`${res} has been added to database`); 
           return res;
        })
        .catch(err=>{
            console.error(err);
            return err;
        })
    }

    async getMovies(){
        return Movies
         .find()
         .then(res => {
             return res
             //console.log(`${res} has been retrieved`);
         })
         .catch(err=>{
             console.log(err);
             return err
         })
    }
}//end of class

module.exports = Movie
module.exports.Movies = Movies