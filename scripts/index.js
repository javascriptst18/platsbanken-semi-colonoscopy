

let cardWrapper = document.querySelector(".card-wrapper");
let apiData = "";
let divToPrint = "";

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
      <p>Annonsrubrik: ${each.annonsrubrik}</p>
      <p>Yrkesbenämning: ${each.yrkesbenämning}</p>
      <p>arbetsplatsnamn = ${each.arbetsplatsnamn}</p>
      <p>kommunnamn = ${each.kommunnamn}</p>
      <p>publiceraddatum = ${each.publiceraddatum}</p>
      <p>antalplatser = ${each.antalplatser}</p>
      <p>sista_ansokningsdag = ${each.sista_ansokningsdag}</p>
      <p>annonsurl = ${each.annonsurl}</p>
      <p>____________________________</p>
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





async function fetchData(url){
  try{
      let result = await fetch(url);
      let resultResolve = await result.json();
      return resultResolve; 
  } catch(error) {
      return error;
  }
 
}
  
