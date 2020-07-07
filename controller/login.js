const express = require('express');
const router = express.Router();

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

    if (errors.length > 0) {
        res.render("login", {
            title: "Login Page",
            errorMessages: errors
        });
    } else {
        res.redirect("/");
    }

});

module.exports = router;