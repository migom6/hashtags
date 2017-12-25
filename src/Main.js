import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import { Font } from 'expo';

import Galllery from './Gallery'
import Camera from './Camera'
export default class Main extends Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
  };
  constructor(props){
    super(props)
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'bebasR': require('./assets/fonts/bebasR.otf')
    });
    this.setState({ fontLoaded: true });
  }

  goShare = (uri) => {
    const { navigate } = this.props.navigation;
    navigate('Share', { uri })
  }

  render() {
    if(this.state.fontLoaded){
      return (
        <View style = {styles.container}>
          <Text style = {styles.header}>PHOTOS ON THIS DEVICE</Text>
          <Galllery goShare = {this.goShare}/>
          <Camera navigate = {this.props.navigation}/>
        </View>
      );
    }
    else {
      return(
        <Text>Loading Font</Text>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27005F',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
      marginTop: 52,
      marginLeft: 16,
      marginRight: 16,
      fontSize: 24, 
      fontFamily: 'bebasR',
      fontWeight: '500',
      color: 'white'
  },
  
});
