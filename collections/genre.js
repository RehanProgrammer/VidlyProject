
const mongoose = require('mongoose');

const database = 'mongodb://localhost/Genre';

mongoose.connect(database, { useNewUrlParser: true })
    .then(() => {
        console.log('mongo database connected from genre');
    })
    .catch(err => {
        console.error(err);
    });


const genreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    }
});

const Genres = mongoose.model('genre', genreSchema);

class Genre {

    async createGenre(genre) {
        const genres = new Genres({
            genre
        
        });
        await genres.save()
            .then(() => {
                console.log(`${genre} has been successfully inserted into the database`);
                return true;
            })
            .catch(err => {
                console.error(err);
                return false;
            });
        return;
     }

    async getGenre() {
        try {
            const res = await Genres
                .find();
            return res;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    }

    async getGenre_WithID(id) {
        try {
            const res = await Genres
                .find({ _id: id });
            return res;
        }
        catch (e) {
            console.error(e);
            return e;
        }
    }

    async updateGenre(id,genre){
           
        let result = await Genres
            .findOneAndUpdate(
                {
                    _id:id
                },
                {
                    genre
                }
            ).then((result)=> {
                console.log(`${result} genre has been updated`);
                return result;
            })
            .catch(e=>{
                return e 
            });
        return result;
    }

    async  GenreDelete(id){
       
            const res = await Genres
                .findOneAndRemove({ _id: id })
                .then(res=>{
                    console.log(`${res} has been removed from database`);
                    return res;
                })
                .catch(e=> {
                    console.log(e);
                    return e;
                });
                return res;
    }
}//end of class

module.exports = Genre;
module.exports.genreSchema = genreSchema;
module.exports.Genres = Genres;