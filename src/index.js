const express = require('express'); 
const {join}= require('path');
const app = express();
const path= require('path');

//configurar el servidor
app.set('port', 4000);
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//rutas
const indexRouts = require('./routes/');
app.use(indexRouts);

//ejecutando el servidor
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
