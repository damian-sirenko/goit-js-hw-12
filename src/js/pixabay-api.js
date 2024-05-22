import axios from 'axios';

const API_KEY = '43948789-3afe6d8ecc2e5aa705550f4b3';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const searchingPhotosByQuery = async (serachQuery, page) => {
	const response = await axios.get('/', {
		params: {
			key: API_KEY,
			q: serachQuery,
			image_type: 'photo',
			orientation: 'horizontal',
			safesearch: true,
			page: page,
			per_page: 15,
		}
	})
	return response.data

};