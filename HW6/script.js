// API key grabbed from home.openweathermap.org/api_keys
const searchBarText = document.querySelector(".search-bar")
const faSearchBtn = document.querySelector(".fa-search");
const weatherDiv = document.querySelector(".weather")
const pastSearch = document.querySelector(".pastSearch")
const citySaveResults = JSON.parse(localStorage.getItem("cities"))  ||  []
const removeBtn = document.querySelector("deleteButton")

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
        // MAY HAVE OBJECT OBJECT HERE WITHOUT THE STRINGIFY
        localStorage.setItem("cities", JSON.stringify(citySaveResults))

        let iconcode = data.weather[0].icon;
        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        weatherDiv.innerHTML = `
         <h2 class="city">${data.name}</h2>
         <div class="temp">${Math.round(data.main.temp)}°</div>
         <img class="icon" src="${iconurl}" alt="" />
         <div class="description">${data.weather[1]}</div>
         <div class="humidity">${data.main.humidity}% Humidity</div>
         <div class="wind">${Math.round(data.wind.speed)}mph</div>
        `
      });
      // TEMPLATE LITERAL
});

// removeBtn.addEventListener("click", (e) => {
//   e.target
// removeBtn.removeChild(ul)
// console.log("removeBtn")
// console.log(ul)
// });



