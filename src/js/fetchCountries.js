'use strict';

export function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v2/name/${name}`;

  // ${BASE_URL}?fields=${name},capital,population,flags.svg,languages
  //   const searchParams = new URLSearchParams({
  //     _limit: '20',
  //     _page: page,
  //   });

  return fetch(
    `${BASE_URL}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
