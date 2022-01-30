import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';

const NewPlaceScren = (props) => {
  const [titleValue, setTitlevalue] = useState('');

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    //TODO add some text validation
    setTitlevalue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue));
    console.log('saved');
    props.navigation.dispatch(CommonActions.goBack());
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Добави ново място</Text>
        <TextInput
          style={styles.textInput}
          placeholder="име"
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <Button
          title="запази"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScren;
