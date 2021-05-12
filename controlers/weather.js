const request = require("request");
function getweather({latitude, longitude, place}, callback)
{
if((latitude&&longitude) == undefined)
{
callback({error:"latitude and longitude is not provided"}, undefined);
} else {
let url = `http://api.weatherstack.com/current?access_key=295bf6ecbfea2ec6fd9aa2916d025629&query=${latitude},${longitude}`;
request(url, (error, response) => {
if(error)
{
callback({error:"unable to find weather information"}, undefined);
} else {
let data = JSON.parse(response.body);
let weatherdata = setweatherdata(place, data);
callback(undefined,  weatherdata);
}
});
}
}
function setweatherdata(place, obj)
{
const weatherDetail = {
place: place,
tempreture: obj.current.temperature,
feelslike: obj.current.feelslike,
sun: obj.current.weather_descriptions,
ren: obj.current.precip+"%",
humidity: obj.current.humidity+"%"
};
return weatherDetail;
}
module.exports = getweather;