import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryMarkup } from './js/render-functions.js';
import { searchingPhotosByQuery } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function handleSubmit(event) {
	event.preventDefault();
	const searchQuery = event.target.elements.search.value.trim();
//   const searchQuery = event.target.elements['search-picture'].value.trim();

  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    event.target.reset();
    iziToast.show({
      message: 'Input field can not be empty',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });

    return;
  }

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  searchingPhotosByQuery(searchQuery)
    .then(imagesData => {
      if (imagesData.total === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          timeout: 2000,
          color: 'red',
		  });
      }

		 galleryEl.innerHTML = galleryMarkup(imagesData.hits.slice(0, 9));

      lightbox.refresh();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      event.target.reset();
      loaderEl.classList.add('is-hidden');
    });
}

searchFormEl.addEventListener('submit', handleSubmit);
