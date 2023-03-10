const nodemailer = require('nodemailer');

fs = require("fs"); 
NOMBRE_ARCHIVO = __dirname + "/mail.txt";


let recoveryPass = 0;

let mailData = {

  };

const transporter = nodemailer.createTransport({
  port: 587,               // true for 465, false for other ports
  host: "smtp-mail.outlook.com",
     auth: {
          user: 'contacto@inteligenio.com',
          pass: 'Luy05268',
       },
  secure: false,
  });

const text_welcome_client = "Explora nuestras categorías en tendencias";
const text1_welcome_client = "Gracias por unirse a Tour, tenemos las mejores tiendas disponibles para ti.";

const text_welcome_store = "Empieza a usar la aplicacion";
const text1_welcome_store = "Gracias por unirse a Tour, en breve estarás al aire. ";

validatex = function(body,html){

  HTML = "";
  if (body.type === recoveryPass){

    mailData = {
      from: 'contacto@inteligenio.com',  // sender address
      to: body.email,   // list of receivers
      subject: 'Codigo de verificacion',
      text: 'Este es tu codigo de verificacion para cambio de tu contraseña',
      html: html,
    };

  }

}


sendMail = async (body,html) =>  {

  await validatex(body,html);

  transporter.sendMail(mailData, function (err, info) {
    if(err)
      console.log("ERROR",err)
 });

} 

module.exports = {
  sendMail
};