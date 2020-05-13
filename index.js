var nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Cloudant = require('@cloudant/cloudant');

app.use(bodyParser.urlencoded({ extended: true }));

var cloudant = new Cloudant({ url: 'cloudantURL', plugins: { iamauth: { iamApiKey: 'APIkey' } } });

cloudant.db.list(function(err, body) {
  body.forEach(function(db) {
   console.log(db);
  });
});

var counter = 0;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'password'
  }
});

app.post('/mail', (req, res) => {

    var fname = `${req.body.fname}`;
    var lname = `${req.body.lname}`;
    var email = `${req.body.email}`;
    var message = `${req.body.message}`;

    console.log(`First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nMessage:\n${message}`);

    cloudant.use('mini_project').insert({_id: counter.toString(), "Name": fname+lname , "Email" : email, "Message": message }, function(err, data) {
      console.log('Error:', err);
      console.log('Data:', data);
      if(!err){
        counter++;
      }
    });

    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'youremail@gmail.com',
      subject: 'B.Tech. GEU First Year Website',
      text: `First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nMessage: ${message}`
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



