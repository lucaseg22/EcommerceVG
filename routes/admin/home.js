var express = require('express');
var router = express.Router();
var productosModel = require('./../../models/productosModel');
var util = require('util')
var cloudinary = require('cloudinary').v2;

const uploader = util.promisify(cloudinary.uploader.upload);


/* GET home page. */
router.get('/', async function (req, res, next) {               
var productos = await productosModel.getProductos();

if (req.query.q === undefined) {
  productos = await productosModel.getProductos();
} else {
  productos = await productosModel.buscarProductos(req.query.q);
}

productos = productos.map(productos => {
  if (productos.img_id) {
    const imagen = cloudinary.image(productos.img_id, {
      width: 100,
      height: 100,
      crop: 'fill'
    });
    return {
      ...productos, 
      imagen
    }
  } else {
    return {
      ...productos
    }
  }
});


  res.render('admin/home', {
    usuario: req.session.nombre,
    productos,
    is_search: req.query.q !== undefined,
    q: req.query.q
    
  });
});

router.get('/eliminar/:id', async (req, res, next)=> {
  var id = req.params.id;

  let productos = await productosModel.getProductosById(id);
  if (productos.img_id){
    await (destroy(productos.img_id));
  }

  await productosModel.deleteProductosById(id);
  res.redirect('/admin/home')
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar');

});

router.post('/agregar', async (req, res, next) => {
  try {
    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.subtitulo != "" 
    && req.body.cuerpo != "") {
      await productosModel.insertProductos({
        ...req.body, 
        img_id
      });

      res.redirect('/admin/home')

    } else {
      res.render('admin/agregar', {
        error: true, message: 'Todos los campos son requeridos.'
      })
    }
  } catch (error){
  res.render('admin/agregar', {
    error: true , message: "No se cargo el producto"
  });
  }
});

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let productos = await productosModel.getProductosById(id);
  res.render('admin/modificar', {
    productos
  });
});

const destroy = util.promisify(cloudinary.uploader.destroy);

router.post('/modificar', async (req, res, next) => {
  

  
try {
  let img_id = req.body.img_original;
  let borrar_img_vieja = false;
  if (req.body.img_delete === "1"){
    img_id = null;
    borrar_img_vieja = true;
  } else {
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await
      uploader(imagen.tempFilePath)).public_id;
      borrar_img_vieja = true;
    }
  }
  if (borrar_img_vieja && req.body.img_original) {
    await (destroy (req.body.img_original));
  }

  let obj = {
    titulo: req.body.titulo,
    subtitulo: req.body.subtitulo,
    cuerpo: req.body.cuerpo,
    precio: req.body.precio,
    img_id
  }

  await productosModel.modificarProductosById(obj, req.body.id);
  res.redirect('/admin/home');
}
catch (error){
  console.log(error)
  res.render('admin/modificar', {
    error: true, message: 'No se modifico el producto'
  })
}
})

module.exports = router;




