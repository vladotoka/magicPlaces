import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import Colors from '../constants/Colors';

const ImgPicker = (props) => {
	const [pickedImage, setPickedImage] = useState();

	const takeImageHandler = async () => {
		//TODO camera permissions
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		} //ADD permissions

		// let image = await ImagePicker.launchImageLibraryAsync({
		// 	//ADD
		// 	mediaTypes: ImagePicker.MediaTypeOptions.All,
		// 	allowsEditing: true,
		// 	aspect: [4, 3],
		// 	quality: 1,
		// });

		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		console.log(image.assets);


		if (!image.canceled) {
			// dummy fixing ImagePicker bug in EXPO SDK46
			//TODO remove this bugfix with next EXPO SDK release
			const dummyManipulationResult = await ImageManipulator.manipulateAsync(
				image.uri,
				[],
				{}
			);
			//end of dummy fix...

			// setPickedImage(image.uri);
			// props.onImageTaken(image.uri);
			setPickedImage(dummyManipulationResult.uri);
			props.onImageTaken(dummyManipulationResult.uri);
		}
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePrewiev}>
				{!pickedImage ? (
					<Text>Все още не сте добавили снимка.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<Button
				title="направи снимка"
				color={Colors.primary}
				onPress={takeImageHandler}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
	},
	imagePrewiev: {
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
});

export default ImgPicker;
