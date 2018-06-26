// form för att söka på stad
const citySearch = document.querySelector("#citySearch");
// checkbox för att välja stockholm
const cityStockholm = document.querySelector("#cityStockholm");
// checkbox för att välja göteborg
const cityGoteborg = document.querySelector("#cityGoteborg");
// checkbox för att välja malmö
const cityMalmo = document.querySelector("#cityMalmo");

// tom variabel för att lagra stockholm söksträng
let stockholm = "";
// tom variabel för att lagra göteborg söksträng
let goteborg = "";
// tom variabel för att lagra malmö söksträng
let malmo = "";

async function searchByCriteria(searchCriteria) {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
}

// lyssna på submit från form för sökning på stad
citySearch.addEventListener("submit", (event) => {
  event.preventDefault();
  // kolla om stockholm-boxen är checkad och lagra i variabeln
  if (cityStockholm.checked) {
    stockholm = "&lanid=1";
  } else {
    stockholm = "";
  }
  // kolla om göteborg-boxen är checkad och lagra i variabeln
  if (cityGoteborg.checked) {
    goteborg = "&lanid=14";
  } else {
    goteborg = "";
  }
  // kolla om malmö-boxen är checkad och lagra i variabeln
  if (cityMalmo.checked) {
    malmo = "&lanid=12";
  } else {
    malmo = "";
  }
  searchByCriteria(`platsannonser/matchning?${stockholm}${goteborg}${malmo}&yrkesomradeid=3&antalrader=30`);
});
