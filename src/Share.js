import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Tags from './Tags'
import Social from './Social'

export default class Share extends Component {
  static navigationOptions = {
    header: null,
    title: 'Home',
  };
  constructor(props){
    super(props)
    const { params } = this.props.navigation.state;
    this.state = {
      uri: params.uri,
      tags: ['No tags here!'],
    }
  }

  updateTags = (newTags) => {
    this.setState({tags: newTags})
  }

  render() {
    let title = this.state.uri
    title = title.slice(-8)
    

    return (
      <View style = {styles.container}>
        <Text style = {styles.header}> {title} </Text>
        <View style = {styles.mainContainer}>
          <View style = {styles.main}>
            <Image
              style={{ height: 350}}
              source={{uri: this.state.uri}}
              resizeMode = {"contain"}
            />
          </View>
        </View> 
        {<Tags tags={this.state.tags}/> }
        <Social updateTags={this.updateTags} url = {this.state.uri}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27005F',
    flexDirection: 'column'
  },
  header: {
      marginTop: 52,
      marginLeft: 16,
      marginRight: 16,
      fontSize: 24, 
      fontFamily: 'bebasR',
      fontWeight: 'bold',
      color: 'white',
      borderBottomWidth: 2,
      borderColor: '#794CFF',
  },
  main : {
    marginRight: 22,
    marginLeft: 22,
  },
  mainContainer : {
    marginTop: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  }
});

