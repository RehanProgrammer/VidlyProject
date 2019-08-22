const express = require('express');
const app = express();
const routes = require('./routes/routes');
const routesMovies = require('./routes/routes_movies')
const rentals = require('./routes/rentals')
//const Db = require('./genre');
const user = require('./routes/register_user');
const auth = require('./routes/auth');
const config = require('config');




process.on('uncaughtException', (ex)=>{
    console.log('we got an uncaughtException ');
});

throw new Error('something happened on start up');
//--------------**************************---------------------------------------
//remember to type this command in the terminal before you start the application
//export NODE_ENV=production//--------------**************************---------------------------------------
//console.log(process.env.password);
if(!config.get('jwtPrivateKey')) {
    console.error('Fatal error:jwtPrivateKey not defined');
    process.exit(1);
}

app.use(express.json());
//app.use('/api/genre', routes);
//app.use('/api/movies', routesMovies);
app.use('/api/rentals',rentals);
app.use('/api/users', user);
app.use('/api/auth', auth);
routes(app);
routesMovies(app);
app.listen(3000,'localhost',()=> {
    console.log('server running on port 3000...');
});

