import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
	Alert,
	Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
	//INFO: props.navigation and props.route here are accessible

	const [pickedLocation, setPickedLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const { mapPickedLocation } = props.route.params; //nav v6 destruct
	const { onLocationPicked } = props;


	const pickOnMapHandler = () => {
		props.navigation.navigate('Map');
	};

	const getLocationHandler = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied :)');
			return;
		}

		try {
			setIsFetching(true);
			const location = await Location.getCurrentPositionAsync();
			setPickedLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
			onLocationPicked({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		} catch (err) {
			Alert.alert(
				'Нещо се обърка',
				`Неуспешно установяване на позиция. Грешка: ${err}`
			);
		}
		setIsFetching(false);
	};

	useEffect(() => {
		if (mapPickedLocation) {
			setPickedLocation(mapPickedLocation);
			onLocationPicked(mapPickedLocation);
		}
	}, [mapPickedLocation, onLocationPicked]);

	return (
		<View style={styles.locationPicker}>
			<MapPreview
				style={styles.mapPreview}
				location={pickedLocation}
				onPress={pickOnMapHandler}
			>
				{isFetching ? (
					<ActivityIndicator size="large" color={Colors.primary} />
				) : (
					<Text>Не е избрана локация!</Text>
				)}
				{errorMsg && <Text>{errorMsg}</Text>}
				{pickedLocation && <Text>{JSON.stringify(pickedLocation)}</Text>}
			</MapPreview>
			<View style={styles.actions}>
				<Button
					title="GPS позиция"
					color={Colors.primary}
					onPress={getLocationHandler}
				/>
				<Button
					title="посочи на карта"
					color={Colors.primary}
					onPress={pickOnMapHandler}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	locationPicker: {
		marginBottom: 15,
	},
	mapPreview: {
		marginBottom: 10,
		width: '100%',
		height: 150,
		borderColor: '#ccc',
		borderWidth: 1,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
});

export default LocationPicker;
