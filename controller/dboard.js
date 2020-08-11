const express = require('express')
const router = express.Router();
const multer = require("multer");
const db = require("../model/db");
const path = require("path");

//multer
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

const upload = multer({ storage: storage, fileFilter: imageFilter });
//multer

//insuring user logged in to restrick the usage
function ensureLogin(req, res, next) {
    if (!req.session.user) {
        res.redirect("/Login");
    } else {
        next();
    }
}

//route to cutomer
router.get("/Customer", ensureLogin, (req, res) => {
    res.render("dashboard/dashboard", {
        title: "Dashboard Page",
        user: req.session.user
    });
});
//insuring ADMIN logged in
function ensureAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.admin) {
        res.redirect("/Login");
    } else {
        next();
    }
}
//route to clerk
router.get("/DataClerk", ensureAdmin, (req, res) => {
    res.render("dashboard/dashboardClerk", {
        title: "Data Clerk Dashboard Page",
        user: req.session.user
    });
});


//route to logout, terminates the session
router.get("/Logout", function(req, res) {
    req.session.reset();
    res.redirect("/Login");
});

//route to view inside the clerks dashboard
router.get("/View", function(req, res) {
    db.getTopAllMeals(false).then((data) => {
        res.render("dashboard/view", {
            title: "Data Clerk Dashboard Page",
            data: data,
            added: true
        });
    }).catch((err) => {
        if (err == "No packages have been found") {
            res.render("dashboard/view", {
                title: "Data Clerk Dashboard Page",
                data: [],
                added: false
            });
        } else {
            console.log(err);
        }
    });
});

//route to add inside the clerks dashboard
router.get("/Add", function(req, res) {
    res.render("dashboard/add", {
        title: "Add New Package",
        succAdded: false,
        user: req.session.user
    });
});

//route to post an add request inside the clerks dashboard
router.post("/Add", upload.single("picture"), (req, res) => {

    let information = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        meals: req.body.meals,
        description: req.body.description,
        top: req.body.top
    };
    //check if it is image 
    try {
        req.body.img = req.file.filename;
    } catch (err) {
        res.render("dashboard/add", {
            title: "Add New Package",
            ifAdded: false,
            error: true,
            information: information,
            user: req.session.user
        });
        return;
    }

    db.validateNewPackage(req.body).then((data) => {
        db.addMeal(data).then((meal) => {
            res.render("dashboard/add", {
                title: "Add New Package",
                ifAdded: true,
                error: false,
                user: req.session.user
            });
        }).catch((err) => {
            console.log("Cannot add a new Package: " + err);
        });
    }).catch((data) => {
        res.render("dashboard/add", {
            title: "Add New Package",
            error: true,
            information: information,
            user: req.session.user
        });
    });
});

//route to edit inside the clerks dashboard
router.get("/Edit", function(req, res) {
    res.render("dashboard/edit", {
        title: "Meal Edit Page",
        user: req.session.user
    });
});

router.post("/Edit", function(req, res) {
    db.getPackagesByTitle(req.body.title).then((meals) => {
        let information = {
            titleholder: meals[0].title,
            category: meals[0].category,
            price: meals[0].price,
            meals: meals[0].meals,
            description: meals[0].description
        };
        res.render("dashboard/editing", {
            title: "Meal Edit Page",
            information: information,
            Updated: false,
            user: req.session.user
        });
    }).catch((err) => {

        res.render("dashboard/edit", {
            title: "Meal Edit Page",
            titleholder: req.body.title,
            error: true,
            user: req.session.user
        });
    });
});

router.post("/Editing", upload.single("picture"), (req, res) => {
    let information = {
        titleholder: req.body.title,
        category: req.body.category,
        price: req.body.price,
        meals: req.body.meals,
        description: req.body.description
    };
    try {
        req.body.img = req.file.filename;
    } catch (err) {
        res.render("dashboard/editing", {
            title: "Meal Edit Page",
            noImage: true,
            information: information,
            Updated: false,
            user: req.session.user
        });
        return;
    }
    db.validateMealEdit(req.body).then((data) => {
        db.editMeal(data).then(() => {
            res.render("dashboard/editing", {
                title: "Meal Edit Page",
                information: information,
                Updated: true,
                user: req.session.user
            });
        }).catch((err) => {
            console.log("Error while editing a meal: " + err);
            res.render("dashboard/editing", {
                title: "Meal Edit Page",
                information: information,
                Updated: false,
                user: req.session.user
            });
        });
    }).catch((data) => {
        res.render("dashboard/editing", {
            title: "Meal Edit Page",
            information: information,
            Updated: false,
            user: req.session.user
        });
    });
});


module.exports = router;