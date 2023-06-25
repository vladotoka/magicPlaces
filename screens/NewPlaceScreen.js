import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Alert,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = (props) => {
	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState();
	const [selectedLocation, setSelectedLocation] = useState();
	const dateOfCreation = useSelector((state) => state.places.bulgarianDate);

	const dispatch = useDispatch();

	const titleChangeHandler = (text) => {
		//TODO add some text validation
		setTitleValue(text);
	};

	const savePlaceHandler = () => {
		//проверка на необходими данни за запис и генериране на съобщение за грешка
		let validationMessage = '';
		if (!titleValue) {
			validationMessage += ' наименование';
		}
		if (!selectedImage) {
			if (!titleValue && !selectedLocation) {
				validationMessage += ',';
			} else if (!titleValue) {
				validationMessage += ' и';
			}
			validationMessage += ' снимка';
		}
		if (!selectedLocation) {
			if (!titleValue || !selectedImage) {
				validationMessage += ' и';
			}
			validationMessage += ' локация';
		}
		if (validationMessage) {
			validationMessage = 'Моля добавете ' + validationMessage;
			Alert.alert('Непълни данни!', validationMessage);
			return;
		}

		dispatch(
			placesActions.addPlace(
				titleValue,
				selectedImage,
				selectedLocation,
				dateOfCreation
			)
		);
		props.navigation.dispatch(CommonActions.goBack());
	};

	const imageTakenHandler = (imagePath) => {
		setSelectedImage(imagePath);
	};

	const locationPickedHandler = useCallback((location) => {
		setSelectedLocation(location);
	}, []);

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Добави ново място</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Наименование"
					value={titleValue}
					onChangeText={titleChangeHandler}
				/>
				<ImagePicker onImageTaken={imageTakenHandler} />
				<LocationPicker
					navigation={props.navigation}
					route={props.route}
					onLocationPicked={locationPickedHandler}
				/>
				<Button
					title="запази"
					color={Colors.primary}
					onPress={savePlaceHandler}
				/>
				<Text>{dateOfCreation}</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 30,
	},
	label: {
		fontSize: 18,
		marginBottom: 15,
	},
	textInput: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingVertical: 4,
		paddingHorizontal: 2,
	},
});

export default NewPlaceScreen;
