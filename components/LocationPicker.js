import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import React, { useState } from 'react';

import * as Location from 'expo-location';

import Colors from '../constants/Colors';

const LocationPicker = (props) => {
  const [pickedLocation, setPickedLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const getLocationHandler = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied :)');
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        'Нещо се обърка',
        `Неуспешно установяване на позиция. Грешка: ${err}`
      );
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>Не е избрана локация!</Text>
        )}
        {errorMsg && <Text>{errorMsg}</Text>}
        {pickedLocation && <Text>{JSON.stringify(pickedLocation)}</Text>}
      </View>
      <Button
        title="вземи текущи координати"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    margin: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default LocationPicker;
