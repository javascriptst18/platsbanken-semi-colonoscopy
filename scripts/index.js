

let cardWrapper = document.querySelector(".card-wrapper");
let apiData = "";
let divToPrint = "";

// form för att söka på stad
const mainSearchForm = document.querySelector("#mainSearchForm");
// input field för att söka på nyckelord
const searchKeyword = document.querySelector("#searchKeyword");
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
// tom variabel för att lagra nyckelord i sökning
let nyckelord = "";


async function searchByCriteria(searchCriteria) {
  const baseURL = "http://api.arbetsformedlingen.se/af/v0/";
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  const apiData = matches.matchningslista.matchningdata;

  printTop10(apiData);
}


let printTop10 = function(apiData){
  for (let each of apiData){
  
  divToPrint += 
  `
  <div class=card>
  <div class="card-flex"><h3 class="annons-rubrik">${each.annonsrubrik}</h3><h5 class="lan">${each.kommunnamn}</h5></div>
  <h5 class="yrkesbenamning">${each.yrkesbenamning}</h5>
  <h3 class="foretag">Företag: ${each.arbetsplatsnamn}</h3>
  
  <div class="card-flex"><h5 class="publicerad">3V</h5>` + //lägg in funktion för att räkna ut hur gammal
  `<h5 class="deadline">Sista ansökningsdag: <span>${each.sista_ansokningsdag}</span</h5>
  </div>
  <a href="${each.annonsurl}" class="flex-link"><button class="ansok">Ansök</button></a>
</div>
  `;
  console.log("annonsrubrik = " + each.annonsrubrik);
  console.log("yrkesbenämning = " + each.yrkesbenamning);
  console.log("arbetsplatsnamn = " + each.arbetsplatsnamn);
  console.log("kommunnamn = " + each.kommunnamn);
  console.log("publiceringsdatum = " + each.publiceraddatum);
  console.log("antalplatser = " + each.antalplatser);
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
  if (searchKeyword.value !== "") {
    nyckelord = searchKeyword.value;
  } else {
    nyckelord = "";
  }
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
  searchByCriteria(`platsannonser/matchning?nyckelord=${nyckelord}${stockholm}${goteborg}${malmo}&antalrader=30`);
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
  
