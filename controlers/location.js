const request = require("request");

function getlocation(address, callback)
{
if(address == undefined)
{
callback({error:"unable to found because location is not provided"}, undefined);
} else {
let url = "http://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoia3Vsd2luZGVyOTYiLCJhIjoiY2tvY2lsbmt3MDZuMDJwcWRzdGxnYmZieiJ9.5jXGSwN6K3CvdUD9Kw7fOw&limit=1"; 
request(url, (error, response) => {
if(error)
{
callback({error:"unable to found provided location"}, undefined);
} else {
let data = JSON.parse(response.body);
let locationdetail = setdata(data);
callback(undefined, locationdetail);
}
});
}
}
function setdata(obj)
{
let locationdetail = {
place: obj.features[0].place_name,
latitude: obj.features[0].center[0],
longitude: obj.features[0].center[1]
};
return locationdetail;
}
module.exports = getlocation;