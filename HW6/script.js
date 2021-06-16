// API key grabbed from home.openweathermap.org/api_keys
const searchBarText = document.querySelector(".search-bar")
const faSearchBtn = document.querySelector(".fa-search");
const weatherDiv = document.querySelector(".weather")
const pastSearch = document.querySelector(".pastSearch")
const citySaveResults = JSON.parse(localStorage.getItem("cities"))  ||  []

console.log(citySaveResults)


const pastSearchLog = function() {
    citySaveResults.forEach(function(city) {
        pastSearch.innerHTML += `<p>${city}</p>`
    })
}
pastSearchLog()

const getWeather = function (city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b204c3ee96ad5178fb7fbbeda767291&units=imperial`;
  return fetch(apiurl).then(function (response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
  });
};



faSearchBtn.addEventListener("click", function(){
    getWeather(searchBarText.value).then(function (data) {
        console.log(data);
        citySaveResults.push(searchBarText.value)
        localStorage.setItem("cities", JSON.stringify(citySaveResults))

        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        weatherDiv.innerHTML = `
         <h2 class="city">${data.name}</h2>
         <div class="temp">${Math.round(data.main.temp)}°</div>
         <img class="icon" src="${iconurl}" alt="" />
         <div class="description">${data.name}</div>
         <div class="humidity">${data.main.humidity}% Humidity</div>
         <div class="wind">${data.name}</div>
        `
      });
});






// onst getWeather = function (city) {
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6989dabdc4acd8059acb7786b6dfb7c`;
//     return fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             displayWeather(data);
//           });
//         } else {
//           data;
//           alert("Error: " + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert("Unable to gather weather data!");
//       });
//   };
