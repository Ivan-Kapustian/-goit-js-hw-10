import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report } from 'notiflix/build/notiflix-report-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectList = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(({ data }) => {
    data.map(({ id, name }) =>
      selectList.insertAdjacentHTML('beforeend', createOptions(id, name))
    );
    loader.classList.add('visually-hidden');
    new SlimSelect({
      select: '.breed-select',
    });
    selectList.classList.remove('visually-hidden');
    selectList.addEventListener('change', getInfo);
  })
  .catch(() => {
    loader.classList.add('visually-hidden');
    Report.failure(
      'Error',
      'Oops! Something went wrong! Try reloading the page!',
      'Ok'
    );
  });

const createOptions = (id, name) => `<option value="${id}">${name}</option>`;

function getInfo(evt) {
  catInfo.classList.add('visually-hidden');
  catInfo.innerHTML = '';
  loader.classList.remove('visually-hidden');
  fetchCatByBreed(evt.currentTarget.value)
    .then(({ data }) => {
      if (data.length < 1) {
        Report.failure(
          'Error',
          "We can't find any information about this breed:( Try find another breed.",
          'Ok'
        );
        loader.classList.add('visually-hidden');
        return;
      }
      data.map(
        ({ url, breeds }) => (catInfo.innerHTML = createMarkup(url, breeds))
      );
      catInfo.classList.remove('visually-hidden');
      loader.classList.add('visually-hidden');
    })
    .catch(() => {
      loader.classList.add('visually-hidden');
      Report.failure(
        'Error',
        'Oops! Something went wrong! Try reloading the page!',
        'Ok'
      );
    });
}

const createMarkup = (url, info) => `
      <img src="${url}" alt="${info[0].name}" width='400' >
      <div>
      <h2>${info[0].name}</h2>
      <p> ${info[0].description}</p>
      <p><b>Temperament:</b></b> ${info[0].temperament}</p>
      </div>`;
