const express = require('express');
const router = express.Router();

const information = {
    name: "",
    lname: "",
    email: "",
    pw: "",
}

router.get("/", (req, res) => {


    res.render("registration", {
        title: "Registration Page"
    });

});

router.get("/registration", (req, res) => {


    res.render("registration", {
        title: "Registration Page"
    });

});

router.post('/registration', (req, res) => {
    const errors = [];
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const re = /^[A-Za-z0-9]+$/;


    if (req.body.fn == "") {
        errors.push("First Name is required");
    }

    if (req.body.ln == "") {
        errors.push("Last Name is required");
    }

    if (req.body.email == "") {
        errors.push("Email is required");
    } else if (!regex.test(req.body.email)) {
        errors.push("Email must be like example@example.ca");
    }

    if (req.body.psw == "") {
        errors.push("Password is required");
    }


    if (req.body.psw.length < 6 || req.body.psw.length > 12) {
        errors.push("Password must be 6 to 12 characters long");
    } else if (!re.test(req.body.psw)) {
        errors.push("Password must contain letters and numbers only");
    }


    information.name = req.body.fn;
    information.lname = req.body.ln;
    information.email = req.body.email;
    information.pw = req.body.psw;

    if (errors.length > 0) {
        res.render("registration", {
            title: "Registration Page",
            errorMessages: errors,
            information: information,
        })
    } else {

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: 'mishafrolov882000@gmail.com',
            from: 'mishafrolov882000@gmail.com',
            subject: 'Registration Form',
            text: 'Welcome to the LiveFit!',
            html: `Thank you for registering with Live Fit. Enjoy our amazing food!`
        };
        sgMail.send(msg)
            .then(() => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(`Error ${err}`);
            })
    }

});

module.exports = router;