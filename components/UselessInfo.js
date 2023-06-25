import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import keys from '../env/keys';
import * as Application from 'expo-application';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';

const UselessInfo = ({ isFocused }) => {
	const [bulgarianDate, setBulgarianDate] = useState(null);
	const [gregorianDate, setGregorianDate] = useState();
	const [location, setLocation] = useState();
	const [locationLabel, setLocationLabel] = useState('Basarbovo');
	const [moonInfo, setMoonInfo] = useState();
	const dateNow = new Date().getDate();
	const buildVersion = Application.nativeBuildVersion;
	const appVersion = Application.nativeApplicationVersion;
	const onPress = () => Linking.openURL('https://bgkalendar.com/');
	const dispatch = useDispatch();

	const getLocation = async () => {
		//TODO list
		//провери за локация в redux store / check for location in redux store
		//опитай се да вземеш текуща локация / try go get current location
		//предложи избор за използване на запазени данни локация / suggest to use the stored location data
		//или промени state текуща локация при успех / or change state current location when the response is resolved
		//reverse geocode => currentLocationLabel
		//setLocationLabel(currentLocationLabel);
		//return;

		await getLastKnowLocation();
		if (location) {
			const response = true;
		}
		// return { Object };
	};

	const getLastKnowLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			//   setErrorMsg('Permission to access location was denied');
			return;
		}
		let location = await Location.getLastKnownPositionAsync({});
		// let location = await Location.getCurrentPositionAsync({});

		let text = JSON.stringify(location);
		setLocation(location);
		console.log('getLastKnowLocation');
		console.log(location);
	};

	const fetchBgDate = async () => {
		console.log('fetch календар и луна inv');
		//if date is the same and bulgarinDate is previously fetched then return
		if (dateNow === gregorianDate && bulgarianDate) {
			return;
		}
		//else fetch data from bg calendar api
		try {
			const response = await fetch(
				'https://bgkalendar.com/api/v0/calendars/bulgarian/dates/today'
			);
			if (!response.ok) {
				throw new Error('Упс. Проблем с бг календар API: response is not OK');
			}
			const resData = await response.json();
			setBulgarianDate(resData.longDate);
			dispatch(
				placesActions.setBulgarianDateRedux(resData.longDate.toString())
			);
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
				`https://api.weatherapi.com/v1/astronomy.json?key=${keys.weatherApiKey}&q=${locationLabel}`
			);
			if (!response.ok) {
				throw new Error('Упс. Проблем с weather API: Response is not OK');
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
		console.log('app version:', appVersion);
		console.log('build version:', buildVersion);
	}, []);

	useLayoutEffect(() => {
		const getData = async () => {
			await fetchBgDate();
			await getLocation();
			await fetchMoonInfo();
		};
		if (isFocused) {
			getData();
		}
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text>
				app version:{appVersion} build version:{buildVersion}
			</Text>
			<Text>AstroData за {locationLabel}</Text>
			{bulgarianDate && (
				<TouchableOpacity style={styles.button} onPress={onPress}>
					<Text>днес е {bulgarianDate}година</Text>
				</TouchableOpacity>
			)}
			{moonInfo && (
				<>
					<Text>
						луна{'      '}
						{moonInfo.astronomy.astro.moonrise}-
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
	},
});

export default UselessInfo;
