import { FlatList, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = (props) => {
  const places = useSelector((state) => state.places.places);
  console.log(places[0]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={() => props.navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigaton]);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          address='адрес'
          image={itemData.item.imageUri}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
