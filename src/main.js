import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryMarkup } from './js/render-functions.js';
import { searchingPhotosByQuery } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.search-form');
let galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

let totalPages = 0;
let searchQuery = '';
let currentPage = 1;
const per_page = 15;

const handleSubmit = async event => {
  event.preventDefault();
  const form = event.currentTarget;
  searchQuery = form.elements.search.value.trim();

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');
  currentPage = 1;

  if (searchQuery === '') {
    iziToast.show({
      message: 'Input field can not be empty',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    form.reset();
    loaderEl.classList.add('is-hidden');

    return;
  }

  try {
    const { total, hits } = await searchingPhotosByQuery(
      searchQuery,
      currentPage
    );

    if (total === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
      loaderEl.classList.add('is-hidden');
      loadMoreBtnEl.classList.add('btn-is-hidden');

      return;
    }

    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(hits));
    loadMoreBtnEl.classList.remove('btn-is-hidden');

    totalPages = Math.ceil(total / per_page);

    if (hits.length < per_page) {
      loadMoreBtnEl.classList.add('btn-is-hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
    } else {
      loadMoreBtnEl.classList.remove('btn-is-hidden');
    }
    lightbox.refresh();
  } catch {
    iziToast.show({
      message: 'An error occurred while fetching images',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
  } finally {
    loaderEl.classList.add('is-hidden');
  }
  form.reset();
};

const smoothScroll = () => {
  const lastItemEl = galleryEl.querySelector('.gallery-item:last-child');
  const imageItemHeight = lastItemEl.getBoundingClientRect().height;
  const scrollHeight = imageItemHeight * 2;

  window.scrollBy({
    top: 1000,
    left: 0,
    behavior: 'smooth',
  });
};

async function onLoadMorePressed(event) {
  try {
    currentPage += 1;
    loaderEl.classList.remove('is-hidden');

    const { hits } = await searchingPhotosByQuery(searchQuery, currentPage);

    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(hits));

    lightbox.refresh();
    smoothScroll();

    if (currentPage >= totalPages) {
      loadMoreBtnEl.classList.add('btn-is-hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
    }
  } catch (error) {
    iziToast.show({
      message: 'An error occurred while fetching more images.',
      position: 'topRight',
      timeout: 2000,
      color: 'red',
    });
    loadMoreBtnEl.classList.add('btn-is-hidden');
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtnEl.addEventListener('click', onLoadMorePressed);
searchFormEl.addEventListener('submit', handleSubmit);

