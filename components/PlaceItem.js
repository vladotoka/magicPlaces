import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import * as Animatable from 'react-native-animatable';

const PlaceItem = (props) => {
	return (
		<Animatable.View
			key={props.id}
			animation="fadeInUp"
			delay={props.index * 100}
			useNativeDriver
		>
			<TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
				<Image style={styles.image} source={{ uri: props.image }} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.address}>{props.address}</Text>
					<Text style={styles.dateOfCreation}>{props.dateOfCreation}</Text>
				</View>
			</TouchableOpacity>
		</Animatable.View>
	);
};

const styles = StyleSheet.create({
	placeItem: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 30,
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: '#ccc',
		borderColor: Colors.primary,
		borderWidth: 1,
	},
	infoContainer: {
		marginLeft: 25,
		width: 250,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	title: {
		color: 'black',
		fontSize: 18,
		marginBottom: 5,
	},
	address: {
		color: '#666',
		fontSize: 14,
	},
	dateOfCreation: {
		color: '#666',
		fontSize: 12,
	},
});

export default PlaceItem;
