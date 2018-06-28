// form input and search results
const searchForm = document.querySelector("#mainSearchForm");
const loadMore = document.querySelector("#loadMore");
let searchKeyword = "";
let searchCity = "&lanid=";
let searchListings = 1;
let searchString = "";
let searchResults = "";

// wrapper for printing search results
let cardWrapper = document.querySelector(".card-wrapper");

 // search form submit listener
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  cardWrapper = document.querySelector(".card-wrapper");  
  while(cardWrapper.hasChildNodes()){ 
    cardWrapper.removeChild(cardWrapper.lastChild);
  }
  // clear previous search parameters
  searchKeyword = "";
  searchCity = "&lanid=";
  searchListings = 1;
  searchString = "";
  searchResults = "";
  // store new search parameters
  keyword = document.querySelector("#searchKeyword");
  city = document.querySelector('#searchCity');
  searchKeyword = keyword.value;
  searchCity += city.value;
  searchString = `platsannonser/matchning?nyckelord=${searchKeyword}${searchCity}&sida=`;
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

// fetch json data from api
async function searchByCriteria(searchCriteria) {
  try {
    console.log(searchCriteria + searchListings);
    const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
    const responseObject = await fetch(baseURL + searchCriteria + searchListings);
    const matches = await responseObject.json();
    const apiData = matches.matchningslista.matchningdata;
    // pass data to print search results
    printSearchResults(apiData);
    // show "load more results" button if search generates a response
    loadMore.classList.remove("hidden");
  }
  catch(error) {
    console.log(error);
    let errorMessage = `
    <div class="card">
    <h3 class="empty-search">Din sökning gav inga träffar.</h3>
    </div>
    `;
    cardWrapper.innerHTML = errorMessage;
    // hide "load more results" button if search have no results
    loadMore.classList.add("hidden");
  }
}

// print search results from user input search query
let printSearchResults = function(apiData) {
  for (let each of apiData){
    // run conversion on search result date/time details
    let shortDate = shortenDate(each.sista_ansokningsdag);
    let timeFromPub = calculateTime(each.publiceraddatum);
    let searchResults2 = `
      
      <div class="card-flex"><h3 class="annons-rubrik">${each.annonsrubrik}</h3><h5 class="lan">${each.kommunnamn}</h5></div>
      <h5 class="yrkesbenamning">${each.yrkesbenamning}</h5>
      <h3 class="foretag">Företag: ${each.arbetsplatsnamn}</h3>
      <div class="flex-button-and-date">
      <div class="card-flex2"><h5 class="publicerad">${timeFromPub}</h5>
      <h5 class="deadline">Sista ansökningsdag: <span>${shortDate}</span</h5>
      </div>
      <a href="${each.annonsurl}" class="flex-link"><button class="ansok">Gå till annonsen</button></a>
      </div>
      
    `;
    
    let div = document.createElement("div");
    div.classList.add("card");
    div.id=each.annonsid;
    div.innerHTML=searchResults2;
   
    cardWrapper.appendChild(div);
    let card = cardWrapper.lastChild;
    card.addEventListener("click", () =>{
      console.log(card.id);
    });
    
    
  }
  // display search results on the html page
  //cardWrapper.innerHTML = searchResults;
  
  // reset form field/options after submit (does not clear search parameters!)
  mainSearchForm.reset();
  // logging search parameters to console for reference
  console.log('Nyckelord: ' + searchKeyword);
  console.log('Stad: ' + searchCity);
  console.log('Sida: ' + searchListings);
  console.log('Söksträng: ' + searchString);
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

