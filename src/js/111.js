import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryItemMarkup } from './js/render-functions.js';
import { fetchPhotosByQuery } from './js/pixabay-api.js';

const searchFormEl = document.querySelector('.search-form');
const loaderEl = document.querySelector('.loader');
let galleryEl = document.querySelector('.gallery');
const moreBtnEl = document.querySelector('.more-btn');

let totalPages = 0;
let imageCurrentPage = 1;
let per_page = 15;
let searchQuery = null;

const handleSubmit = async event => {
  event.preventDefault();

  const form = event.currentTarget;

  searchQuery = form.elements.search.value.trim();

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');

  imageCurrentPage = 1;

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
    const { total, hits } = await fetchPhotosByQuery(
      searchQuery,
      imageCurrentPage
    );

    if (total === 0) {
      iziToast.show({
        message: 'Sorry, there are no images for this query',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
      loaderEl.classList.add('is-hidden');
      moreBtnEl.classList.add('btn-is-hidden');
      return;
    }

    galleryEl.insertAdjacentHTML('beforeend', createGalleryItemMarkup(hits));
    moreBtnEl.classList.remove('btn-is-hidden');

    totalPages = Math.ceil(total / per_page);

    if (hits.length < per_page) {
      moreBtnEl.classList.add('btn-is-hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
    } else {
      moreBtnEl.classList.remove('btn-is-hidden');
    }
    lightbox.refresh();
    // smoothScroll();
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
  const lastItemEl = galleryEl.querySelector('li.gallery-item:last-child');
  const imageItemHeight = lastItemEl.getBoundingClientRect().height;
  const scrollHeight = imageItemHeight * 2;

  window.scrollBy({
    top: 730,
    left: 0,
    behavior: 'smooth',
  });
};

async function handleMoreBtn(event) {
  try {
    imageCurrentPage += 1;
    loaderEl.classList.remove('is-hidden');

    const { hits } = await fetchPhotosByQuery(searchQuery, imageCurrentPage);

    galleryEl.insertAdjacentHTML('beforeend', createGalleryItemMarkup(hits));

    lightbox.refresh();
    smoothScroll();

    if (imageCurrentPage >= totalPages) {
      moreBtnEl.classList.add('btn-is-hidden');
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
    moreBtnEl.classList.add('is-hidden');
  } finally {
    loaderEl.classList.add('is-hidden');
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

moreBtnEl.addEventListener('click', handleMoreBtn);
searchFormEl.addEventListener('submit', handleSubmit);
