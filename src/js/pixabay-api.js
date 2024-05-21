const API_KEY = '43948789-3afe6d8ecc2e5aa705550f4b3';
const BASE_URL = 'https://pixabay.com/api/';

export const searchingPhotosByQuery = (q = '') => {
  const searchConfig = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${searchConfig}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};
