const express = require('express'); 
const {join}= require('path');
const app = express();
const path= require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');
const passport= require('passport');

//inicializaciones
require('./lib/passport');

//middlewares
app.use(session({
    secret: 'gbikesnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//configurar el servidor
app.set('port', 4000);
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//rutas
const indexRouts = require('./routes/index');
app.use(indexRouts);
app.use(require('./routes/auntenticacion'));
app.use('/admin', require('./routes/consultasadmin'));

//app.use('/consultas',require('./routes/consultas'));

//ejecutando el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//variables globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('ola');
    next();
});
