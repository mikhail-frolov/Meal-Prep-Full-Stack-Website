const express = require('express');
const router = express.Router();
const meals = require("../model/meals");


//routes
router.get("/", (req, res) => {

    res.render("home", {
        title: "Home Page",
        data: meals.getTopMeals()
    });

});

router.get("/mealspackages", (req, res) => {



    res.render("mealpackages", {
        title: "Meal Packages Page",
        data: meals.getAllMeals()
    })
});


router.get("/dashboard", (req, res) => {

    res.render("dashboard", {
        title: "Dashboard Page"
    });
});

module.exports = router;