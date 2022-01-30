import { StyleSheet, Text, View, Platform } from 'react-native';
import React, { useLayoutEffect } from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = (props) => {
  // const {navigation} = props;
  

useLayoutEffect(() => {
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Add Place' iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => props.navigation.navigate('NewPlace')} />
      </HeaderButtons>
    )
  })
  
}, [props.navigaton]);


  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
