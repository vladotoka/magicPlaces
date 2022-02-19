import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
const MapScreen = (props) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { navigation } = props;
  const mapRegion = {
    latitude: 42.51,
    longitude: 27.46,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const savePickedLocationHandler = () => {
    console.log('save inv');
    console.log(selectedLocation);
    if (!selectedLocation) {
      Alert.alert('Упс', 'Не сте избрали позиция!');
      return;
    }
    props.navigation.navigate('NewPlace', {
      mapPickedLocation: selectedLocation,
    });
  };

  const selectLocationHandler = (eventData) => {
    console.log(eventData.nativeEvent.coordinate);
    setSelectedLocation({
      lat: eventData.nativeEvent.coordinate.latitude,
      lng: eventData.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={savePickedLocationHandler}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>ЗАПАЗИ</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedLocation]);

  return (
    <MapView
      region={mapRegion}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="маркер" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

export default MapScreen;
