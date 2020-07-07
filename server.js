const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

//load environment varibale file
require('dotenv').config({ path: "./config/keys.env" });

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

//Use handlebars template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//load controllers
const generalController = require("./controller/general");
const formsController = require("./controller/forms");
const loginController = require("./controller/login");


app.use("/", generalController);
app.use("/registration", formsController);
app.use("/login", loginController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Web server is up and running");
});