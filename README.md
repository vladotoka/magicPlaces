# magicPlaces

React Native Expo app

Записвате магичните места, които сте посетили в локална SD памет
Save the magical places you've visited to a local SD memory

class Place {
	constructor(id, title, imageUri, address, lat, lng) {
		this.id = id;
		this.title = title; //име на мястото
		this.imageUri = imageUri; //снимка направена с камерата
		this.address = address; //reverse geocode адрес с API TomTom         
		this.lat = lat; //GPS координати latitude избор в карта от Google или от вграден GPS
		this.lng = lng; //GPS координати longitude
	}
}
