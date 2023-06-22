import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import placesReducer from './store/places-reducer';

import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/PlacesNavigator';
import { init, performSchemaUpdates } from './helpers/db';

init()
	.then(() => {
		console.log('Initialized database');
	})
	.catch((err) => {
		console.error(`Initialized DB failed with error: ${err}`);
	});

performSchemaUpdates()
	.then(() => {
		console.log('Version of DB checked');
	})
	.catch((err) => {
		console.error(`DB perform schema update error: ${err}`);
	});

const rootReducer = combineReducers({
	places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
