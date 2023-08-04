import axios from 'axios';
const API_KEY =
  'live_5A6itroODULjMiDobyaN0GuwsF9jzUP43Mg5Jj7gViufoQ6YICdA8NTrXWdZRq94';
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios
    .get(`${BASE_URL}/breeds`)
    .then(response => response)
    .catch(error => error);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response)
    .catch(error => error);
}
