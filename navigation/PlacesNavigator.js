import { Platform } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
				},
				headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
			}}
		>
			<Stack.Screen
				name="List"
				component={PlacesListScreen}
				options={{ title: 'Всички места' }}
			/>
			<Stack.Screen
				name="PlaceDetail"
				component={PlaceDetailScreen}
				options={{ title: 'Подробни данни' }}
			/>
			<Stack.Screen
				name="NewPlace"
				component={NewPlaceScreen}
				options={{ title: 'Ново място' }}
				initialParams={{ mapPickedLocation: null }}
			/>
			<Stack.Screen
				name="Map"
				component={MapScreen}
				options={{ title: 'Карта' }}
				initialParams={{ readonly: null, initialLocation: null }}
			/>
		</Stack.Navigator>
	);
};

export default MainNavigator;
