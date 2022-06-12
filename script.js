"use strict";

// Selecting Elements
const searchBar = document.querySelector(".search-bar");
const searchIcon = document.querySelector(".search-icon");
const countriesContainer = document.querySelector(".country-div");
const countryLayout = document.querySelector(".layout");
const closeCountryLay = document.querySelector(".div__close");
const error = document.querySelector(".error");

// Async await function to fetch and use data from the API server
const countries = async function (country) {
  try {
    // Country API promise
    const countryApi = await fetch(
      `https://restcountries.com/v2/name/${country}`
    );
    // Country API data
    const [countryData] = await countryApi.json();

    // Formatting the area number
    const areaNumber = new Intl.NumberFormat("en-US").format(countryData.area);

    // Formatting the population number
    const populationNumber = new Intl.NumberFormat("en-US").format(
      countryData.population
    );

    // Creating an html elements to append inside the country__div
    const html = `
    <div class="country">
      <div class="country__flag">
        <img
          class="country__img"
          src="${countryData.flag}"/>
      </div>
      <div class="country__info">
        <h3 class="country__name">${countryData.name}</h3>
        <p class="country__data">Acronym: ${countryData.cioc}</p>
        <p class="country__data">Continent: ${countryData.region}</p>
        <p class="country__data">Region: ${countryData.subregion}</p>
        <p class="country__data">Capital: ${countryData.capital}</p>
        <p class="country__data">Area: ${areaNumber} km2</p>
        <p class="country__data">Population: ${populationNumber}</p>
        <p class="country__data">Language: ${countryData.languages[0].name}</p>
        <p class="country__data">Currency: ${countryData.currencies[0].name}</p>
      </div>
    </div>
  `;

    // Using insertAdjacentHTML to append the html elements
    countryLayout.insertAdjacentHTML("afterbegin", html);
    countriesContainer.classList.remove("hidden");

    // Catching errors
  } catch (err) {
    const message = "Please enter a valid country";
    searchBar.value = message;
  }
}; // End of countries Async function

// Click event when the user click on the search icon
searchIcon.addEventListener("click", function () {
  countries(searchBar.value);
});

// Keydown event when the user press Enter to search for a country
searchBar.addEventListener("keydown", function (event) {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    countries(searchBar.value);
    searchBar.value = "";
  }
});

// Close country layout function
const closeLayout = function () {
  const container = document.querySelector(".country");
  container.parentNode.removeChild(container);
  countriesContainer.classList.add("hidden");
  searchBar.value = "";
  searchBar.focus();
};

// Closing the country layout by the X button
closeCountryLay.addEventListener("click", closeLayout);

// Closing the country layout by the Escape button
document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    closeLayout();
  }
});
