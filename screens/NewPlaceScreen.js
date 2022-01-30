import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Colors from '../constants/Colors';

const NewPlaceScren = (props) => {
  const [titleValue, setTitlevalue] = useState('');
  const titleChangeHandler = (text) => {
    //TODO add some text validation
    setTitlevalue(text);
  };

  const savePlaceHandler = () => {}
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
        <Button title="запази" color={Colors.primary} onPress={savePlaceHandler} />
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
