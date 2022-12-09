import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';

const ImgPicker = (props) => {
	const [pickedImage, setPickedImage] = useState();

	const takeImageHandler = async () => {
		//camera permissions
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		} 

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		console.log(image.assets[0].uri);


		if (!image.canceled) {
			setPickedImage(image.assets[0].uri);
			props.onImageTaken(image.assets[0].uri);
		}
	};

	const selectGalleryImageHandler = async () => {
		//galery permissions
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Permission to access the gallery is required!');
			return;
		} 

		const image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});



		if (!image.canceled) {
			setPickedImage(image.assets[0].uri);
			props.onImageTaken(image.assets[0].uri);
		}
	};


	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>Все още не сте добавили снимка.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<View style={styles.actions}>
			<Button
				title="направи снимка"
				color={Colors.primary}
				onPress={takeImageHandler}
			/>
			<Button
			title="отвори галерия"
			color={Colors.primary}
			onPress={selectGalleryImageHandler}
		/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},

});

export default ImgPicker;
