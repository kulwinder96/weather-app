const express = require("express");
const locationdata = require("../controlers/location.js");
const weatherdata = require("../controlers/weather.js");
const router = express.Router();
router.get("/weather", (request, response) => {
response.render("index.hbs");
});
router.get("/weather/location", (request, response) => {
if(!(request.query.location_field))
{
response.render("error404", {error:"location field is empty "});
} else {
locationdata(request.query.location_field, (error, data) =>{
if(error)
{
response.render("index", error);
} else {
weatherdata(data, (error, wdata) => {
if(error)
{
response.render("error404", error);
} else {
console.log(wdata);
response.render("weather", wdata);
}
});


}
});
}
});
router.get("/location", (request, response) => {
if(!(request.query.locationkey))
{
response.json({"error":"location is not available "});
} else {
locationdata(request.query.locationkey, (error, data) => {
if(error)
{
response.send(error);
} else {
weatherdata(data, (error, wdata) => {
if(error)
{
response.send(error);
} else {
console.log(wdata);
response.send(wdata);
}
});
}
});
}
});
module.exports = router;