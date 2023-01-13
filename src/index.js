import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// console.log(inputEl);
inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
const clearMarkup = ref => (ref.innerHTML = '');
function onInputSearch(event) {
  const searchText = event.target.value.trim();

  if (searchText.length === 1) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );

    return;
  }

  fetchCountries(searchText)
    .then(responce => {
      const searchdatalength = responce.length;
      if (searchdatalength > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name'
        );
        return;
      }

      if (searchdatalength === 1) {
        clearMarkup(countryList);
        countryInfo.innerHTML = createCountryCard(responce[0]);
      }
      if (searchdatalength > 2 && searchdatalength < 10) {
        clearMarkup(countryInfo);
        countryList.innerHTML = createLi(responce);
      }
    })
    .catch(err => {
      clearMarkup(countryList);
      clearMarkup(countryInfo);
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
}

function createLi(array = []) {
  return array
    .map(
      el =>
        `<li><img src='${el.flags.svg}'width="50px" height="30px"/><span>${el.name}</span></li>`
    )
    .join('');
}

function createCountryCard(obj) {
  return `<h1><img src='${obj.flags.svg}'width="50px" height="30px"/>
  <span>${obj.name}</span></h1>
  <ul class="list">
  <li><b>Capital:</b> ${obj.capital}</li>
  <li><b>Population:</b> ${obj.population}</li>
  <li><b>Languages:</b> ${obj.languages
    .map(el => el.name)
    .join(', ')}</li></ul>`;
}
