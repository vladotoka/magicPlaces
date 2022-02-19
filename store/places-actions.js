import * as FileSystem from 'expo-file-system';

import keys from '../env/keys';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
	return async (dispatch) => {
		const response = await fetch(
			`https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&apiKey=${keys.geoapifyApiKey}`
		);
		if (!response.ok) {
			throw new Error('Упс. Проблем с reverse geocode API');
		}

		const resData = await response.json();
		if (!resData.features) {
			throw new Error('Упс. Проблем с отговор от reverse geocode API');
		}

		const address = resData.features[0].properties.formatted;

		const fileName = image.split('/').pop();
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
			console.log(dbResult);

			dispatch({
				type: ADD_PLACE,
				placeData: { id: dbResult.insertId, title: title, image: newPath },
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadPlaces = () => {
	return async (dispatch) => {
		try {
			const dbResult = await fetchPlaces();
			console.log('dbResult:');
			console.log(dbResult);
			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};
