import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Platform,
	Alert,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
const MapScreen = (props) => {
	const { navigation } = props;
	const { readonly, initialLocation } = props.route.params; //nav v6 destruct
	const [selectedLocation, setSelectedLocation] = useState(initialLocation);
	const mapRegion = {
		latitude: initialLocation ? initialLocation.lat : 42.51,
		longitude: initialLocation ? initialLocation.lng : 27.46,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const savePickedLocationHandler = () => {
		if (!selectedLocation) {
			Alert.alert('Упс', 'Не сте избрали позиция!');
			return;
		}
		props.navigation.navigate('NewPlace', {
			mapPickedLocation: selectedLocation,
		});
	};

	const selectLocationHandler = (eventData) => {
		if (readonly) {
			return;
		}
		setSelectedLocation({
			lat: eventData.nativeEvent.coordinate.latitude,
			lng: eventData.nativeEvent.coordinate.longitude,
		});
	};

	let markerCoordinates;

	if (selectedLocation) {
		markerCoordinates = {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		};
	}

	useLayoutEffect(() => {
		navigation.setOptions(
			readonly
				? {}
				: {
						headerRight: () => (
							<TouchableOpacity
								onPress={savePickedLocationHandler}
								style={styles.headerButton}
							>
								<Text style={styles.headerButtonText}>ЗАПАЗИ</Text>
							</TouchableOpacity>
						),
				  }
		);
	}, [navigation, selectedLocation, readonly]);

	return (
		<MapView
			region={mapRegion}
			style={styles.map}
			onPress={selectLocationHandler}
		>
			{markerCoordinates && (
				<Marker title="маркер" coordinate={markerCoordinates}></Marker>
			)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		flex: 1,
	},
	headerButton: {
		marginHorizontal: 20,
	},
	headerButtonText: {
		fontSize: 16,
		color: Platform.OS === 'android' ? 'white' : Colors.primary,
	},
});

export default MapScreen;
