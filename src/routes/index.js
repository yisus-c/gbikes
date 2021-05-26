const express= require('express');
const router = express.Router();
const path = require('path');
const {join} = require('path');

router.get('/', (req, res) =>{
    res.render('index.html');
    
});
router.get('/giant', (req, res) =>{
    res.render('views/giant.html');
    
});
module.exports = router;