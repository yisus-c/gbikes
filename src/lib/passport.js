const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers= require('../lib/helpers')

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done)=>{
    const{fullname} = req.body;
    const nuevoUsuario={
        username,
        password,
        fullname
    };
    nuevoUsuario.password = await helpers.encryptPassword(password);
    const resultado = await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    nuevoUsuario.id= resultado.insertId;
   return done(null, nuevoUsuario);

}));


passport.serializeUser((user, done)=>{
    console.log(user.id)
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{   
   const rows= await pool.query('SELECT * FROM usuarios WHERE id= ?', [id]);
    done(null, rows[0]);
});