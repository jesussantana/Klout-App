const nodemailer = require("nodemailer");
// email sender function
exports.sendemail = function (req, res) {
  // Definimos el transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "klout@gmail.com",
      pass: "Klout101$",
    },
  });
  // Definimos el email
  const mailOptions = {
    from: "Remitente",
    to: "destinatario@gmail.com",
    subject: "Asunto",
    text: "Contenido del email",
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(500, err.message);
    } else {
      console.log("email sent");
      res.status(200).jsonp(req.body);
    }
  });
};
