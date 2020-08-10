// add styling to dashboard, make responsive 



const express = require('express')
const router = express.Router();
const multer = require("multer");
const db = require("../model/db");


const storage = multer.diskStorage({
    destination: "./public/img/",
    filename: function(req, file, cb) {

        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        return cb(null, true);
    } else {
        return cb(new Error('Not an image! Please upload an image.', 400), false);
    }
};

const upload = multer({ storage: storage, imageFilter: imageFilter });

function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/Login");
    } else {
        next();
    }
}

router.get("/Customer", ensureLogin, (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Dashboard Page",
        user: req.session.user
    });
});

function ensureAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        res.redirect("/Login");
    } else {
        next();
    }
}

router.get("/DataClerk", ensureAdmin, (req, res) => {
    res.render("dashboard/dashboardClerk", {
        title: "Data Clerk Dashboard Page",
        user: req.session.user
    });
});



router.get("/Logout", function(req, res) {
    req.session.reset();
    res.redirect("/Login");
});

router.get("/View", function(req, res) {
    db.getTopAllMeals(false).then((data) => {
        res.render("dashboard/view", {
            title: "Data Clerk Dashboard Page",
            data: data,
            found: true
        });
    }).catch((err) => {
        if (err == "No meals have been found") {
            res.render("dashboard/view", {
                title: "Data Clerk Dashboard Page",
                data: [],
                found: false
            });
        } else {
            console.log(err);
        }
    });
});

router.get("/Add", function(req, res) {
    res.render("dashboard/add", {
        title: "Add New Meals"
    });
});

router.post("/Add", upload.single("img"), (req, res) => {
    let information = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        meals: req.body.meals,
        description: req.body.description,
        top: req.body.top
    };
    db.validateNewPackage(req.body).then((data) => {

        req.session.user = user;

        if (user.admin) {
            res.redirect("/Dashboard/DataClerk");
        } else {
            res.redirect("/Dashboard/Customer");
        }

    }).catch((data) => {
        res.render("registration/registration", {
            title: "Customer Registration Page",
            fnameError: data.errors.fname,
            lnameError: data.errors.lname,
            emailError: data.errors.email,
            passwordError: data.errors.psw,
            formD: formD
        });
    });
});

router.get("/Edit", function(req, res) {
    //req.session.reset();
    res.redirect("/Login");
});

module.exports = router;