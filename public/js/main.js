"use strict";
let search_btn = document.getElementById("search_button");
search_btn.addEventListener("click", function(event){
event.preventDefault();
datagetter(document.getElementById("search_input").value, (error, data) =>
{
if(error)
{
document.getElementById("get_data").innerHTML= error;
} else {
document.getElementById("get_data").innerHTML= data;
}
});
});
function datagetter(input, callback){
if(input == "")
{
let data = `
<h2> error </h2>
<p>
location field is empty 
</p>
`;
callback(data, undefined);
} else {
let promise = fetch("/location/?locationkey="+input);
promise.then((response) => {

return response.json();
}).then((value) =>{
let data = `
<h2> ${value.place} weather informationn </h2>
<table>
<tr> <th> place: </th> <td>${value.place}</td> </tr>
<tr> <th> tempreture: </th> <td>${value.tempreture}</td> </tr>
<tr> <th> humidity:</th> <td>${value.humidity}</td> </tr>
</table>
`;
callback(undefined, data);
});
promise.catch(error => {
let data = `
<h2> error </h2>
<p>
${error.message}
</p>
`;
callback(data, undefined);
});
}
}