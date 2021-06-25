const { Console } = require('console');
const express= require('express');
const router = express.Router();
const path = require('path');
const {join} = require('path');

const pool=require('../database');

router.get('/', (req, res) =>{
    res.render('index.html');
    
});
router.get('/giant', (req, res) =>{
    res.render('views/giant.html');
    
});
router.get('/admin/add', (req, res) =>{
    res.render('views/add.html'); 
});
router.get('/admin', (req, res) =>{
    res.render('views/admin.html'); 
});

//recibir datos
router.post('/admin/add', async(req, res) => {
    
    const { clave, nombre, marca, categoria, precio} = req.body;
    const nuevoProducto ={
        clave,
        nombre,
        marca,
        categoria,
        precio
    };
    await pool.query('INSERT INTO productos set ?', [nuevoProducto]);
    res.redirect('/admin/list');
});

router.get('/admin/list', async(req, res) => {
    const productos = await pool.query('SELECT * FROM productos');
    const resultados = await pool.query('SELECT COUNT(*) FROM productos');
    const resultado = resultados[0]['COUNT(*)'];
    var i = 1;
    var claves = [resultado];
    var nombres = [resultado];
    for(var a=0; a<resultado; a++){
        claves[a] = productos[a].clave;
    }
    for(var a=0; a<resultado; a++){
        nombres[a]= productos[a].nombre;
    }
    
    res.render('views/list.html',{resultado, productos, i, claves, nombres});
    
});
router.get('/admin/edit/:id', async(req, res) =>{
    const { id } = req.params;
    const prod= await pool.query('SELECT * FROM productos WHERE clave = ?', [id]);
    res.render('views/edit.html', {prod: prod[0]});
    
});
router.post('/admin/edit/:id', async(req, res)=>{
    const {id} = req.params;
    const {nombre, precio, marca, categoria} = req.body;
    const nuevoProducto = {
        nombre,
        precio,
        marca,
        categoria
    };
    await pool.query('UPDATE productos set ? WHERE clave = ?', [nuevoProducto, id]);
    res.redirect('/admin/list')
});

module.exports = router;