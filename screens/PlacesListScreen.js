import { FlatList, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import * as placesActions from '../store/places-actions';
import keys from '../env/keys';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

import { useIsFocused } from '@react-navigation/native';

const PlacesListScreen = (props) => {
	const isFocused = useIsFocused();

	const dispatch = useDispatch();
	const places = useSelector((state) => state.places.places);
	// console.log(places[0]);
	const [bulgarianDate, setBulgarianDate] = useState(null);
	const [gregorianDate, setGregorianDate] = useState();
	const [moonInfo, setMoonInfo] = useState();
	const dateNow = new Date().getDate();

	const fetchBgDate = async () => {
		console.log('feth календар и луна inv');
		//if date is the same and bulgarinDate is previously fetched then return
		if (dateNow === gregorianDate && bulgarianDate) {
			return;
		}
		//else fetch data from bgcalndar api
		try {
			const response = await fetch(
				'https://bgkalendar.com/api/v0/calendars/bulgarian/dates/today'
			);
			if (!response.ok) {
				throw new Error('Упс. Проблем с бг календар API: response is not OK');
			}
			const resData = await response.json();
			setBulgarianDate(resData.longDate);
			setGregorianDate(dateNow);
		} catch (err) {
			setBulgarianDate('неизвестна дата');
			console.error(`Упс. Проблем с бг календар API:${err}`);
		}
	};

	const fetchMoonInfo = async () => {
		//if date is the same and moonInfo is previously fetched then return
		if (dateNow === gregorianDate && moonInfo) {
			return;
		}

		// else fetch moon data from wether API
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/astronomy.json?key=${keys.weatherApiKey}&q=Burgas`
			);
			if (!response.ok) {
				throw new Error('Упс. Проблем с бг weather API: Response is not OK');
			}
			const resData = await response.json();
			setMoonInfo(resData);
			console.log(resData);
		} catch (err) {
			// setBulgarianDate('неизвестна дата');
			console.error(`Упс. Проблем с weather API:${err}`);
		}
	};

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

	useLayoutEffect(() => {
		if (isFocused) {
			fetchBgDate();
			fetchMoonInfo();
		}
	}, [isFocused]);

	useEffect(() => {
		dispatch(placesActions.loadPlaces());
	}, [dispatch]);

	return (
		<View>
			{bulgarianDate && <Text>днес е {bulgarianDate}година</Text>}
			{moonInfo && (
				<>
					<Text>
						луна{'      '}{moonInfo.astronomy.astro.moonrise}-
						{moonInfo.astronomy.astro.moonset}{' '}
						{moonInfo.astronomy.astro.moon_illumination}%{' '}
						{moonInfo.astronomy.astro.moon_phase}
					</Text>
					<Text>
						слънце {moonInfo.astronomy.astro.sunrise}-
						{moonInfo.astronomy.astro.sunset}
					</Text>
				</>
			)}
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
		</View>
	);
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
