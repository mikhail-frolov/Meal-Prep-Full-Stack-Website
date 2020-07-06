const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const meals = require("./model/meals");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

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

app.get("/login", (req, res) => {


    res.render("login", {
        title: "Login Page"
    });

});

app.post('/login', (req, res) => {

    const errors = [];
    if (req.body.username == "") {
        errors.push("Username is required");
    }

    if (req.body.psw == "") {
        errors.push("Password is required");
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


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Web Server is up and running!");
});