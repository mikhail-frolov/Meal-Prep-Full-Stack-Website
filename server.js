const express = require("express");
const exphbs = require('express-handlebars');

const meals = require("./model/meals");

const app = express();

app.use(express.static("public"));

// set handlebars as template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//routes
app.get("/", (req, res) => {



    res.render("home", {
        title: "Home Page",
        data: meals.getTopMeals()
    });
});

app.get("/mealspackages", (req, res) => {



    res.render("mealpackages", {
        title: "Meal Packages Page",
        data: meals.getAllMeals()
    })
});

app.get("/registration", (req, res) => {


    res.render("registration", {
        title: "Registration Page"
    });

});


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Web Server is up and running!");
});