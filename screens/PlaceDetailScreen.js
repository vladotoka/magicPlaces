import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

import { deletePlace } from '../helpers/db';

const PlaceDetailScreen = (props) => {
  const { placeTitle, placeId } = props.route.params; //nav v6 destruct
  const deleteItemHandler = async () => {

    //изтрива мястото само в SQL, но не и в redux!
try {
await deletePlace(placeId);
} catch (err) {
  console.log(err);
  throw err;
}
  }

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
      <Text>title:{placeTitle}</Text>
      <Text>id:{placeId}</Text>
      <Button title='изтрий' onPress={deleteItemHandler} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
