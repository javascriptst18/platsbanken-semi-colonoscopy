async function searchByCriteria(searchCriteria) {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  const matches = await responseObject.json();
  const matchesData = matches.matchningslista.matchningdata;
  for (let each of matchesData)
  console.log(each.annonsrubrik);

}

searchByCriteria('platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30');
