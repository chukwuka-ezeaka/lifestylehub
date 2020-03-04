const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const creds = require("./configs");

const app = express();
const port = 4444;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log("We are live on port 4444");
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.post("/api/v1", (req, res) => {
  var data = req.body;

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  });

  var mailOptions = {
    from: data.email,
    to: "RECIEVING_EMAIL_GOES_HERE",
    subject: "New Message from Contact Form",
    html: `<p>${data.name}</p>
      <p>${data.email}</p>
      <p>${data.message}</p>`
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }
    smtpTransport.close();
  });
});
