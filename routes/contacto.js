var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', { title: 'Contacto' });
});

module.exports = router;

var nodemailer= require('nodemailer');

router.post('/', async(req, res, next) => {

  var email = req.body.email; 
  var mensaje = req.body.mensaje;

 console.log(req.body);
  
 var obj={
    to:'lucasezequielgomez22@gmail.com',
    subject: 'Contacto Ecommerce',
    html: mensaje + ". Responder a: " + email
  }
  var transporter= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
  });
  var info= await transporter.sendMail(obj);
  res.render('contacto',{
    message: 'Mail enviado correctamente'
  });
});