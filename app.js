/*
* get express
*get path
*get hbs (handlbars)
*/
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weatherrouter = require("./routers/weatherrouter.js");
const partials = path.join(__dirname, "/templates/partials");
//create app variable and install express function;
const app = express();
hbs.registerPartials(partials);
//call app engine function  and pass hbs;
//app.engine("hbs", hbs);
/*
*call app.set function
* and set view engine and change view dir;
*/
app.set("views", path.join(__dirname, "/templates/view"));
app.set("view engine", "html");
app.set("view engine", "hbs");
// call app.use function and set public folder as a static;
app.use(express.static(path.join(__dirname, "/public")));
app.use(weatherrouter);
//listen port using app.listen;
app.listen(process.env.PORT||3000);