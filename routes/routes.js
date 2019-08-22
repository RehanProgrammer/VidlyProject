const auth = require('../middleware/auth')
const Joi = require('joi');
const Db = require('../collections/genre');
module.exports = function (app) {
    const db = new Db();

    /*app.get('/', (req,res) => {
        res.send("Welcome to my genre website");
    });*/

    app.get('/api/genre',(req, res) => {
        db.getGenre()
            .then(genre => {
                res.status(200).send(genre);
                return;
            })
            .catch(e => {
                console.error(e);
                res.status(500).send("something failed");
                return;
            });

    });

    app.get('/api/genre/:id', (req, res) => {
        let genreId = req.params.id;
        db.getGenre_WithID(genreId)
            .then(genre => {
                res.status(200).send(genre)
                return;
            })
            .catch(err => {
                console.error(err);
                 return;
            });
    });

    app.post('/api/genre',auth, (req, res) => {
        const { error, value } = validateGenre(req.body);
        if (!error) {
            if (db.createGenre(value.genre)) {
                res.status(200).send(`${value.genre} has been entered into the database`);
                return;
            }
        }
        else {
            console.error(error);
            res.status(404).send(error.details[0].message);
            return;
        }
    });

    app.put('/api/genre/:id', (req, res) => {
        let genreId = req.params.id;
        const { error, value } = validateGenre(req.body);
        if (!error) {
           
            db.updateGenre(genreId, value.genre)
            .then((result) => {
            res.status(200).send(`${result} has been updated in the database`);
            })
            .catch(e => {
                console.log(`${e} from line 72 in routes module`);
                res.status(400).send(e);
            });
        }
        else {
            console.error(error);
            res.status(404).send(error.details[0].message);
            return;
        }
    })

    app.delete('/api/genre/:id' , (req, res) => {
        let id = req.params.id;
        db.GenreDelete(id)
        .then(result => {
            res.status(200).send(`${result} has been deleted in the database`);
        })
        .catch(e=> {
            res.status(404).send(error.details[0].message);
        })
      });
    }//end of export module

    
     //validate the req.body
     function validateGenre(genre) {
        const schema = {
            genre: Joi.string().min(3).required()
        }
        const { error, value } = Joi.validate(genre, schema);
        //console.log(`error: ${error}\nvalue: ${value}`)
        return { error, value };
    }

    



    /*app.get('/api/genre/:id', (req, res) => {
        var Genre = genre.find((genre) => {
            if (genre.id === parseInt(req.params.id)) {
                return genre;
            }
            else return false;
        });

        if (Genre) {
            return res.status(200).send(Genre);
        }
        else if (!Genre) {
            return res.status(404).send("Genre not found");
        }
    })

    app.post('/api/genre', (req, res) => {
        const {error , value} = validateGenre(req.body);
        
        if (error) {
            res.status(404).send(error.details[0].message);
            return 
        }
        else {

        }

    app.put('/api/genre/:id', (req,res) => {
        var Genre = genre.find((genre) => {
            if (genre.id === parseInt(req.params.id)) {
                return genre;
            }
            else return false;
        });
        if(Genre){
            const { error , value } = validateGenre(req.body);
            if (error){
                return res.status(404).send(error.details[0].message)
            }
           
            Genre.genre = req.body.genre
            genre.push(Genre);
            res.status(200).send(genre);
            return;
        }
        else if(!Genre){
            res.status(400).send('could not find genre with ' + req.params.id)
            return;
        }
    });


    app.delete('/api/genre/:id', (req,res)=>{
         const Genre= genre.find((c)=> {
            if (c.id === parseInt(req.params.id)){
                return c
            }
            else return false;
        });
        console.log(Genre);
        if(Genre){
            var index = genre.indexOf(Genre);
            genre.splice(index,1);
            return res.send(Genre);
        }
    });*/




 /*.then(result => {
                console.log(result);
                res.status(200).send(`${value.genre} with ${genreId} has been updated`);
                return;
            })
            .catch((result)=> {
                console.error(result);
                res.status(404).send(error.details[0].message);
                return;
            })*/


            /*else{
                console.error(error);
                res.status(404).send(error.details[0].message);
                return;
            }*/



