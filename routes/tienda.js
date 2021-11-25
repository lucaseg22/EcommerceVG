var express = require('express');
var router = express.Router();
var productosModel = require('./../models/productosModel');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/', async function(req, res, next) {

  var productos = await productosModel.getProductos();
  if (req.query.q === undefined) {
    productos = await productosModel.getProductos();
  } else {
    productos = await productosModel.buscarProductos(req.query.q);
  }
  productos = productos.map(productos => {
    if (productos.img_id){
      const imagen = cloudinary.url(productos.img_id, {
        width: 250,
        height: 300,
        crop: 'fill'
      });
      return {
        ...productos, 
        imagen
      }
    } else {
      return {
        ...productos,
        imagen: '/images/noimage.jpg'
      }
    }
  });
 

  res.render('tienda', {
    productos, 
    is_search: req.query.q !== undefined,
    q: req.query.q
  });
});

module.exports = router;