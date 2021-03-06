import { FlatList, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useLayoutEffect, useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = (props) => {
	const dispatch = useDispatch();
	const places = useSelector((state) => state.places.places);
	console.log(places[0]);

	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Add Place"
						iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
						onPress={() => props.navigation.navigate('NewPlace')}
					/>
				</HeaderButtons>
			),
		});
	}, [props.navigaton]);

	useEffect(() => {
		dispatch(placesActions.loadPlaces());
	}, [dispatch]);

	return (
		<FlatList
			data={places}
			renderItem={(itemData) => (
				<PlaceItem
					title={itemData.item.title}
					address={itemData.item.address}
					image={itemData.item.imageUri}
					onSelect={() => {
						props.navigation.navigate('PlaceDetail', {
							placeId: itemData.item.id,
						});
					}}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
