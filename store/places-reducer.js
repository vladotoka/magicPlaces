import { ADD_PLACE, SET_PLACES, DELETE_ITEM } from './places-actions';
import Place from '../models/place';

const initialState = {
	places: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PLACES:
			return {
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
			return {
				places: state.places.concat(newPlace),
			};
		case DELETE_ITEM:
			console.log('reducer:should delete id', action.id);
			// console.log(state.places);
			const updatedPlaces = state.places.filter(
				(item) => item.id !== action.id
			);
			console.log(updatedPlaces);
			return { places: updatedPlaces };

		default:
			return state;
	}
};
