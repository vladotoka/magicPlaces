import * as FileSystem from 'expo-file-system';

import keys from '../env/keys';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addPlace = (title, image, location) => {
	return async (dispatch) => {
		// 	`https://api.geoapify.com/v1/geocode/reverse?lat=${location.lat}&lon=${location.lng}&apiKey=${keys.geoapifyApiKey}`
		const response = await fetch(
			`https://api.tomtom.com/search/2/reverseGeocode/${location.lat},${location.lng}.json?key=${keys.tomtomApiKey}`
		);

		if (!response.ok) {
			throw new Error('Упс. Проблем с reverse geocode API');
		}

		const resData = await response.json();

		if (!resData.addresses) {
			throw new Error('Упс. Проблем с отговор от reverse geocode API');
		}

		// const address = resData.features[0].properties.formatted; //api.geoapify.com
		const address = resData.addresses[0].address.freeformAddress; //api.tomtom.com

		const fileName = image.split('/').pop();
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const dbResult = await insertPlace(
				title,
				newPath,
				address,
				location.lat,
				location.lng
			);

			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId,
					title: title,
					image: newPath,
					address: address,
					coords: { lat: location.lat, lng: location.lng },
				},
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
			dispatch({ type: SET_PLACES, places: dbResult.rows._array });
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const deleteItem = (id) => {
	return { type: DELETE_ITEM, id: id };
};
