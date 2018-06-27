

let cardWrapper = document.querySelector(".card-wrapper");
let apiData = "";

// all options and input for the job search functionality
let jobSearchOptions = {
  mainSearchForm: document.querySelector("#mainSearchForm"),
  searchKeyword: document.querySelector("#searchKeyword"),
  cityStockholm: document.querySelector("#cityStockholm"),
  cityGoteborg: document.querySelector("#cityGoteborg"),
  cityMalmo: document.querySelector("#cityMalmo"),
  stockholm: "",
  goteborg: "",
  malmo: "",
  nyckelord: ""
}

async function searchByCriteria(searchCriteria) {
  const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  const apiData = matches.matchningslista.matchningdata;

  printSearchResults(apiData);
}

let printSearchResults = function(apiData) {
  let divToPrint = "";
  for (let each of apiData){
  divToPrint += 
  `
  <div class=card>
  <div class="card-flex"><h3 class="annons-rubrik">${each.annonsrubrik}</h3><h5 class="lan">${each.kommunnamn}</h5></div>
  <h5 class="yrkesbenamning">${each.yrkesbenamning}</h5>
  <h3 class="foretag">Företag: ${each.arbetsplatsnamn}</h3>
  <div class="flex-button-and-date">
  <div class="card-flex2"><h5 class="publicerad">3V</h5>` + //lägg in funktion för att räkna ut hur gammal
  `<h5 class="deadline">Sista ansökningsdag: <span>${each.sista_ansokningsdag}</span</h5>
  </div>
  <a href="${each.annonsurl}" class="flex-link"><button class="ansok">Ansök</button></a>
  </div>
  </div>
  `;
  console.log("annonsrubrik = " + each.annonsrubrik);
  console.log("yrkesbenämning = " + each.yrkesbenamning);
  console.log("arbetsplatsnamn = " + each.arbetsplatsnamn);
  console.log("kommunnamn = " + each.kommunnamn);
  console.log("publiceringsdatum = " + each.publiceraddatum);
  console.log("sista_ansokningsdag = " + each.sista_ansokningsdag);
  console.log("annonsURL = " + each.annonsurl);
  console.log("------------------------------");
  }
  cardWrapper.innerHTML = divToPrint; 
}

// lyssna på submit från form för sökning på stad
mainSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // kolla om input field har innehåll och lagra i variabeln
  if (jobSearchOptions.searchKeyword.value !== "") {
    jobSearchOptions.nyckelord = searchKeyword.value;
  } else {
    jobSearchOptions.nyckelord = "";
  }
  // kolla om stockholm-boxen är checkad och lagra i variabeln
  if (jobSearchOptions.cityStockholm.checked) {
    jobSearchOptions.stockholm = "&lanid=1";
  } else {
    jobSearchOptions.stockholm = "";
  }
  // kolla om göteborg-boxen är checkad och lagra i variabeln
  if (jobSearchOptions.cityGoteborg.checked) {
    jobSearchOptions.goteborg = "&lanid=14";
  } else {
    jobSearchOptions.goteborg = "";
  }
  // kolla om malmö-boxen är checkad och lagra i variabeln
  if (jobSearchOptions.cityMalmo.checked) {
    jobSearchOptions.malmo = "&lanid=12";
  } else {
    jobSearchOptions.malmo = "";
  }
  searchByCriteria(`platsannonser/matchning?nyckelord=${jobSearchOptions.nyckelord}${jobSearchOptions.stockholm}${jobSearchOptions.goteborg}${jobSearchOptions.malmo}&antalrader=30`);
  // searchByCriteria(`platsannonser/matchning?${stockholm}${goteborg}${malmo}&nyckelord=${searchKeyword}&antalrader=30`);
});

async function fetchData(url) {
  try {
    let result = await fetch(url);
    let resultResolve = await result.json();
    return resultResolve; 
  } catch(error) {
      return error;  
  }
}

function shortenDate(date){
  let datumFilter = date.toString();
datumFilter = datumFilter.substr(0, 10);
return datumFilter;
}

// FIX THIS SO THAT WE LOAD 10 LATEST JOBS WHEN PAGE (i.e. window) LOADS
// window.onload = () => {
//   console.log('Window Loaded')
//   const apiData = "platsannonser/matchning?nyckelord=javascript&sida=1&antalrader=10";
//   printSearchResults(apiData);
// }
