import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PlaceDetailScreen = (props) => {
  const { placeTitle, placeId } = props.route.params; //nav v6 destruct

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
      <Text>{placeTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
