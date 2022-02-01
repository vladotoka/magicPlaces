import { Image, StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const takeImageHandler = async () => {
    //TODO camera permissions

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePrewiev}>
        {!pickedImage ? (
          <Text>Все още не сте добавили снимка.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="направи снимка"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePrewiev: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImgPicker;
