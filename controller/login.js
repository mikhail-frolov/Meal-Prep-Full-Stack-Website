const express = require('express');
const router = express.Router();
const db = require("../model/db");

router.get("/", (req, res) => {

    res.render("login/login", {
        title: "Login Page"
    });

});

router.post("/", (req, res) => {
    let information = {

    };
    information.email = req.body.email;
    information.password = req.body.password;

    db.validateUserLogin(req.body).then((user) => {
        req.session.user = user;
        if (user.admin) {

            res.redirect("/Dashboard/DataClerk");

        } else {
            res.redirect("/Dashboard/Customer");

        }
    }).catch((err) => {
        res.render("login/login", {

            title: "Login Page",
            errorMessages: data.errors,
            information: information

        });
    });
});

module.exports = router;