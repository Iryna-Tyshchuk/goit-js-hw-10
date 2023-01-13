'use strict';

export function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v2/name/${name}`;

  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
