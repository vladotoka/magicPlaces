import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import keys from '../env/keys';
import * as Application from 'expo-application';
import * as Location from 'expo-location';

const UselessInfo = ({ isFocused }) => {
	const [bulgarianDate, setBulgarianDate] = useState(null);
	const [gregorianDate, setGregorianDate] = useState();
	const [location, setLocation] = useState();
	const [moonInfo, setMoonInfo] = useState();
	const dateNow = new Date().getDate();
	const buildVersion = Application.nativeBuildVersion;
	const appVersion = Application.nativeApplicationVersion;

	const getLastKnowLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
		//   setErrorMsg('Permission to access location was denied');
		  return;
		}
		let location = await Location.getLastKnownPositionAsync({});
		// let location = await Location.getCurrentPositionAsync({});
		
		setLocation(location);
		let text = JSON.stringify(location);
		console.log('getLastKnowLocation');
		console.log(location);
	}

	const fetchBgDate = async () => {
		console.log('fetch календар и луна inv');
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
				`https://api.weatherapi.com/v1/astronomy.json?key=${keys.weatherApiKey}&q=Ruse`
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
			await getLastKnowLocation();
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
			<Text>AstroData</Text>
			{bulgarianDate && <Text>днес е {bulgarianDate}година</Text>}
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
