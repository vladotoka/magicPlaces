import {
	ADD_PLACE,
	SET_PLACES,
	DELETE_ITEM,
	SET_BULGARIANDATE,
} from './places-actions';
import Place from '../models/place';

const initialState = {
	places: [],
	bulgarianDate: 'няма дата',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PLACES:
			return {
				...state,
				places: action.places.map(
					(pl) =>
						new Place(
							pl.id.toString(),
							pl.title,
							pl.imageUri,
							pl.address,
							pl.lat,
							pl.lng,
							pl.dateOfCreation
						)
				),
			};
		case ADD_PLACE:
			const newPlace = new Place(
				action.placeData.id.toString(),
				action.placeData.title,
				action.placeData.image,
				action.placeData.address,
				action.placeData.coords.lat,
				action.placeData.coords.lng,
				action.placeData.dateOfCreation
			);
			return { ...state, places: [newPlace].concat(state.places) };
		case DELETE_ITEM:
			console.log('reducer:should delete id', action.id);
			// console.log(state.places);
			const updatedPlaces = state.places.filter(
				(item) => item.id !== action.id
			);
			console.log(updatedPlaces);
			return { ...state, places: updatedPlaces };
		case SET_BULGARIANDATE:
			return { ...state, bulgarianDate: action.bulgarianDate };

		default:
			return state;
	}
};
