var express = require("express");
var router = express.Router();
let nodemailer = require("nodemailer");

/* GET: home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/*GET: about page */
router.get("/about", function (req, res, next) {
  res.render("chat", { title: "About Page" });
});
/*GET: chat page */
router.get("/chat", function (req, res, next) {
  res.render("chat", { title: "Chat Page" });
});
/*GET: contact page */
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Page" });
});

/*POST /contact => for submitting the contact form*/
router.post("/contact", (req, res) => {
  let { firstname, lastname, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",

    service: "gmail",

    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  //Email message options
  let mailOptions = {
    from: req.body.email,
    to: process.env.USER,
    subject: "MeWe Contact Form Submission",
    text: `Name:${firstname}${lastname}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Sendiong email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .send(
          "An error occurred while sending the email. Please try again later."
        );
    } else {
      const confirmationMessage = `
            <p>Thank you for contacting. We will review your message and get back to you as soon as possible.</p>
            <a href="/">Back to Home</a>`;
      res.send(confirmationMessage);

      console.log("Email sent: " + info.response);
      res
        .status(200)
        .send("Your message has been successfully sent. Thank you!");
    }
  });
});

module.exports = router;
