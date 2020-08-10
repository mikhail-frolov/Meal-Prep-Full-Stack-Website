const express = require('express');
const router = express.Router();
const meals = require("../model/meals");
const db = require("../model/db");

//routes
router.get("/", (req, res) => {


    db.getTopAllMeals(true).then((meals) => {
        res.render("home", {
            title: "Home Page",
            data: meals,
            found: true
        })
    }).catch((err) => {
        if (err == "No meals have been found") {
            res.render("home", {
                title: "Home Page",
                data: [],
                found: false
            });
        } else {
            console.log(err);
        }
    });

});

router.get("/mealspackages", (req, res) => {


    db.getTopAllMeals(false).then((meals) => {
        res.render("mealpackages", {
            title: "Meal Packages Page",
            data: meals,
            found: true
        })
    }).catch((err) => {
        if (err == "No meals have been found") {
            res.render("mealpackages", {
                title: "Meal Packages Page",
                data: [],
                found: false
            });
        } else {
            console.log(err);
        }
    });

});


module.exports = router;