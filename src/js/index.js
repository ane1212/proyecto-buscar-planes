import loadWeatherByCoordinates from "../api/apiTiempo.js";
// import { EventSearcher } from "./eventSearcher.js";
import { createCard } from "./definir-card.js";


const latEus = 43.2630;
const lonEus = -2.9350;
loadWeatherByCoordinates(latEus, lonEus);

// const searcher = new EventSearcher();

// const provinceSelect= document.getElementById('filter-province');
// const muniSelect = document.getElementById('filter-municipality');
// const typeSelect = document.getElementById('filter-type');
// const dateInput = document.getElementById('filter-date');
// const btnSearch = document.getElementById('btn-search');
// const viewContainer=document.getElementById('view-container');
// const smartMsg=document.getElementById('smart-suggestion');

// async function init(){
//     await searcher.loadInitialData();
//     renderCards(searcher.allEvents);
// }

// provinceSelect.addEventListener('chage',(event)=>{
//     const provinceId= event.target.value;
//     muniSelect.innerHTML= '<option value="">Selecciona municipio</option>';

//     if (provinceId){
//         const filtered=searcher.allMunicipalities.filter(m => m.provinceId===Number(provinceId));

//         filtered.forEach(m=>{
//             const opt=document.createElement('option');
//             opt.value=m.name;
//             opt.textContent=m.name;
//         });
//         muniSelect.disabled=false;
//     }else{
//         muniSelect.disabled=true;
//     }
// });

// btnSearch.addEventListener('click', async()=>{
//     const criteria={
//         type: typeSelect.value,
//         munipality:muniSelect.value,
//         date: dateInput.value
//     };

//     if (criteria.date){
//         if(criteria.type=== "" && criteria.date){
//             smartMsg.textContent="Basado en el clima, te recomendamos de interior como teatro.";
//         }
//     }
//     const filtered=searcher.applyFilters(criteria);
//     renderCards(filtered);
// });


// function renderCards(eventsList) {
//     if (eventsList.length === 0) {
//         viewContainer.innerHTML = "<p>No se encontraron planes.</p>";
//         return;
//     }
   
//     viewContainer.innerHTML = eventsList.map(event => createCard(event)).join('');
// }

// viewContainer.addEventListener('click', (e) => {
//     const favBtn = e.target.closest('.icon-fav');
//     const card = e.target.closest('.card');

//     if (favBtn) {
//         e.stopPropagation();
//         favBtn.classList.toggle('active');
//         return;
//     }

//     if (card) {
//         window.location.href = `details-card.html?id=${card.id}`;
//     }
// });

// init();




