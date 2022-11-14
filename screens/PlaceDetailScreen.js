import React, { useState, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	ScrollView,
	Image,
	TouchableWithoutFeedback,
	Modal,
	Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { deletePlace } from '../helpers/db';
import * as Clipboard from 'expo-clipboard';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';

const PlaceDetailScreen = (props) => {
	const { placeId } = props.route.params; //nav v6 destruct
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const selectedPlace = useCallback(
		useSelector((state) =>
			state.places.places.find((place) => place.id === placeId)
		),
		[placeId]
	);
	const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng };

	const deleteItemHandler = async () => {
		//TODO изтрива мястото само в SQL, но не и в redux!
		try {
			await deletePlace(placeId);
			console.log('db delet inv');
		} catch (err) {
			console.log(err);
			throw err;
		}
		// dispatch(placesActions.deleteItem(placeId));
		//TEMP dispatch reload DB
		dispatch(placesActions.loadPlaces());
		props.navigation.navigate('List');
	};

	const coordsToClipboard = () => {
		// copy coordinates to clipboard
		Clipboard.setString(`${selectedPlace.lat}, ${selectedPlace.lng}`);
		setModalVisible(true);
		setTimeout(() => {
			setModalVisible(false);
		}, 1900);
	};

	const showMapHandler = () => {
		props.navigation.navigate('Map', {
			readonly: true,
			initialLocation: selectedLocation,
		});
	};

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>
								Координатите са копирани в клипборда!
							</Text>
						</View>
					</View>
				</Modal>
			</View>
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalDeleteVisible}
					onRequestClose={() => {
						Alert.alert('Отменено изтриване.');
						setModalDeleteVisible(!modalDeleteVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>
								Моля потвърдете изтриване на {selectedPlace.title}?
							</Text><View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
							<Button title="изтриване" onPress={deleteItemHandler} />
							<Button title="отмени" onPress={() => {setModalDeleteVisible(false)}} /></View>
						</View>
					</View>
				</Modal>
			</View>
			<Image style={styles.image} source={{ uri: selectedPlace.imageUri }} />
			<View style={styles.locationContainer}>
				<View style={styles.addressContainer}>
					<Text style={styles.address}>{selectedPlace.address}</Text>
				</View>
				<MapPreview
					style={styles.mapPreview}
					location={selectedLocation}
					onPress={showMapHandler}
				/>
				<TouchableWithoutFeedback onPress={coordsToClipboard}>
					<Text style={styles.address}>
						lat:{selectedPlace.lat} lon:{selectedPlace.lng}
					</Text>
				</TouchableWithoutFeedback>
			</View>
			<Button title="изтрий" onPress={()=>{setModalDeleteVisible(true)}} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		height: '35%',
		minHeight: 300,
		width: '100%',
		backgroundColor: '#ccc',
	},
	locationContainer: {
		marginVertical: 20,
		width: '90%',
		maxWidth: 350,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: 'white',
		borderRadius: 10,
	},
	addressContainer: {
		padding: 20,
	},
	address: {
		color: Colors.primary,
		textAlign: 'center',
	},
	mapPreview: {
		width: '100%',
		maxWidth: 350,
		height: 300,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default PlaceDetailScreen;
