import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import keys from '../env/keys';
import Colors from '../constants/Colors';

const MapPreview = (props) => {
  const markerColor = Colors.primary.slice(1);
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://open.mapquestapi.com/staticmap/v5/map?key=${keys.mapquestApiKey}&size=400,200&zoom=14&locations=${props.location.lat},${props.location.lng}&defaultMarker=marker-${markerColor}`;
    console.log(imagePreviewUrl);
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <>
          <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
        </>
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
