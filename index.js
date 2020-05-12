var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourmail@gmail.com',
    pass: 'password'
  }
});

app.post('/mail', (req, res) => {
    console.log(`First Name: ${req.body.fname}\nLast Name: ${req.body.lname}\nEmail: ${req.body.email}\nMessage:\n${req.body.message}`);

    var mailOptions = {
      from: 'yourmail@gmail.com',
      to: 'yourmail@gmail.com',
      subject: 'Query on B.Tech. GEU First Year Website',
      text: `First Name: ${req.body.fname}\nLast Name: ${req.body.lname}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect("http://127.0.0.1:5500/pages/Contact.html");

  });
  
const port = 8080;
  
app.listen(port, () => {
    console.log(`Server running on port${port}`);
});



