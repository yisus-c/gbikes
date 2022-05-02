const express = require('express');
const router = express.Router();
const passport= require('passport');

router.get('/signup', (req, res)=>{
    res.render('views/aut/signup.html')
});

router.post('/signup', passport.authenticate('local.signup', {
    succesRedirect: '/perfil',
    failureRedirect: '/signup',
    failureFlash: false
}))

router.get('/perfil', (req, res)=>{
res.send('perfil');
});


module.exports = router;