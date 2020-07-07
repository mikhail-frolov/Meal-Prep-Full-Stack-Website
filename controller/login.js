const express = require('express');
const router = express.Router();

const information = {
    un: "",
    pw: "",
}

router.get("/", (req, res) => {

    res.render("login", {
        title: "Login Page"
    });

});

router.get("/login", (req, res) => {

    res.render("login", {
        title: "Login Page"
    });

});

router.post('/login', (req, res) => {

    const errors = [];
    const re = /^[A-Za-z0-9]+$/;
    if (req.body.username == "") {
        errors.push("Username is required");
    }

    if (req.body.psw == "") {
        errors.push("Password is required");
    }
    if (req.body.psw.length < 6 || req.body.psw.length > 12) {
        errors.push("Password must be 6 to 12 characters long");
    } else if (!re.test(req.body.psw)) {
        errors.push("Password must contain letters and numbers only");
    }

    information.un = req.body.username;
    information.pw = req.body.psw;

    if (errors.length > 0) {
        res.render("login", {
            title: "Login Page",
            errorMessages: errors,
            information: information
        })
    } else {
        res.redirect("/");
    }

});

module.exports = router;