const express = require('express'); 
const {join}= require('path');
const app = express();
const path= require('path');
const morgan = require('morgan');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para que aparezca en la consola xd
app.use(express.json());

//configurar el servidor
app.set('port', 4000);
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//rutas
const indexRouts = require('./routes/');
app.use(indexRouts);

//app.use('/consultas',require('./routes/consultas'));

//ejecutando el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//variables globales

