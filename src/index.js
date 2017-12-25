import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Constants } from 'expo';


import Main from './Main'
import Share from './Share'
import Cam from './Cam'

export default class Index extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
        />  
        <Stackscreen />
      </View>  
    );
  }
}

const Stackscreen = StackNavigator({
    Home: { screen: Main },
    Share: { screen: Share },
    Cam: { screen: Cam }
  });

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight, 
    flex: 1,
    backgroundColor: '#fff',
  },
});
