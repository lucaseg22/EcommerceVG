var express = require('express');
var router = express.Router();
var productosModel = require('./../models/productosModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var productos = await productosModel.getProductos();
  if (req.query.q === undefined) {
    productos = await productosModel.getProductos();
  } else {
    productos = await productosModel.buscarProductos(req.query.q);
  }
  res.render('index', {
    productos, 
    is_search: req.query.q !== undefined,
    q: req.query.q
  });
});

module.exports = router;
