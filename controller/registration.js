const express = require('express');
const router = express.Router();
const db = require("../model/db");

router.get("/", (req, res) => {


    res.render("login/registration", {
        title: "Registration Page"
    });

});


router.post("/", (req, res) => {

    let information = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    };

    db.validateUserRegistration(req.body).then((data) => {
        db.addUser(data).then((user) => {
            const sgMail = require('@sendgrid/mail');
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: `${req.body.email}`,
                from: 'mishafrolov882000@gmail.com',
                subject: 'LiveFit Welcomes you!',
                text: 'Welcome to the LiveFit!',
                html: `Thank you for registering with Live Fit. Enjoy our amazing food!`
            };
            sgMail.send(msg);

            req.session.user = user;
            if (user.admin) {

                res.redirect("/Dashboard/DataClerk")

            } else {

                res.redirect("/Dashboard/Customer");

            }

        }).catch((err) => {
            console.log("Error in registration: " + err);
        });
    }).catch((data) => {
        res.render("login/registration", {
            title: "Registration Page",
            errorMessages: data.errors,
            information: information
        });
    });
});

module.exports = router;