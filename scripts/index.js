
let cardWrapper = document.querySelector(".card-wrapper");
let apiData = "";
let divToPrint = "";

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