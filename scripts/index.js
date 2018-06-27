/* VARIABLES */

// form input and search results
const searchForm = document.querySelector("#mainSearchForm");
const loadMore = document.querySelector("#loadMore");
let searchKeyword = "";
let searchCity = "";
let searchListings = 1;
let searchString = "";
let searchResults = "";

// wrapper for printing search results
const cardWrapper = document.querySelector(".card-wrapper");

/* EVENTLISTENERS */

 // search form submit listener
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // clear previous search parameters
  searchKeyword = "";
  searchCity = "";
  searchListings = 1;
  searchString = "";
  searchResults = "";
  // store new search parameters
  keyword = document.querySelector("#searchKeyword");
  city = document.querySelector('#searchCity');
  searchKeyword = keyword.value;
  searchCity = city.value;
  searchString = `platsannonser/matchning?nyckelord=${searchKeyword}&lanid=${searchCity}&sida=${searchListings}&antalrader=10`;
  // pass search parameters to search for results
  searchByCriteria(searchString);
});

// load more results button listener
loadMore.addEventListener('click', function (event) {
  event.preventDefault();
  // increment search listings
  searchListings++;
  // print incremented search listings
  searchByCriteria(searchString);
});

/* FUNCTIONS */

// fetch json data from api
async function searchByCriteria(searchCriteria) {
  const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  const apiData = matches.matchningslista.matchningdata;
  // pass data to print search results
  printSearchResults(apiData);
}

// print search results from user input search query
let printSearchResults = function(apiData) {
  for (let each of apiData){
    let shortDate=shortenDate(each.sista_ansokningsdag);
    let timeFromPub = calculateTime(each.publiceraddatum);
    searchResults += `
      <div class=card>
      <div class="card-flex"><h3 class="annons-rubrik">${each.annonsrubrik}</h3><h5 class="lan">${each.kommunnamn}</h5></div>
      <h5 class="yrkesbenamning">${each.yrkesbenamning}</h5>
      <h3 class="foretag">Företag: ${each.arbetsplatsnamn}</h3>
      <div class="flex-button-and-date">
      <div class="card-flex2"><h5 class="publicerad">${timeFromPub}</h5>
      <h5 class="deadline">Sista ansökningsdag: <span>${shortDate}</span</h5>
      </div>
      <a href="${each.annonsurl}" class="flex-link"><button class="ansok">Ansök</button></a>
      </div>
      </div>
    `;
  }
  cardWrapper.innerHTML = searchResults;
  mainSearchForm.reset();
}

// convert utc date for search results
function shortenDate(date, number = 0){
  if (!date) {
    return " ";
  }
  let datumFilter = date;
  let datum = datumFilter.toString();
  let datumShort = datum.substr(number, 10);
  return datumShort;
}

// calculate publication date for search results
function calculateTime(date) {
  let newDate = Date.parse(new Date());
  let oldDate = Date.parse(date);
  let calcDateDiff = newDate - oldDate;
  let diffHour = calcDateDiff / 3600000;
  if (diffHour < 1) {
    return parseInt(diffHour*60)+ "m"
  } else if (diffHour < 24) {
    return parseInt(diffHour) + "h";
  } else if (diffHour > 24 && diffHour < 168) {
    return parseInt(diffHour/24) + "d";
  } else if (diffHour > 168) {
    return parseInt(diffHour/168) + "v";
  }  
}
