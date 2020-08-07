const express = require('express');
const router = express.Router();



router.get("/", (req, res) => {

    res.render("login/login", {
        title: "Login Page"
    });

});

router.post("/", (req, res) => {
    const information = {
        email: "",
        password: ""
    };

    const errors = [];
    const re = /^[A-Za-z0-9]+$/;
    if (req.body.email == "") {
        errors.push("Email is required");
    }

    if (req.body.password == "") {
        errors.push("Password is required");
    }
    if (req.body.password.length < 6 || req.body.password.length > 12) {
        errors.push("Password must be 6 to 12 characters long");
    } else if (!re.test(req.body.password)) {
        errors.push("Password must contain letters and numbers only");
    }

    information.email = req.body.email;
    information.password = req.body.password;

    if (req.body.email == "" || req.body.password == "") {
        //checking if passes info
        console.log(information);

        res.render("login/login", {
            title: "Login Page",
            errorMessages: errors,
            information: information
        });
    } else {
        res.redirect("/dashboard");
    }

});

module.exports = router;