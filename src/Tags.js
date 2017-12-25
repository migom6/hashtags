import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Tags extends Component {

  constructor(props){
      super(props)
      color = []
      for(i = 0; i < this.props.tags.length; i++){
          color[i] = false;
      }
      this.state = {
          click: [...color]
      }
  }

  palette = (tag, index) => {
      return(
        <View style = {styles.palette} key={index}>
            <Text style = {styles.text}>#{tag}</Text>
        </View>
       );
    } 

  render() {
    return (
      <View style = {styles.container}>
        {this.props.tags.map((tag, index) => this.palette(tag, index))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection : 'row',
    backgroundColor: '#27005F',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40
  },
  text: {
      fontSize: 18, 
      fontFamily: 'bebasR',
      fontWeight: 'normal',
      color: 'white',    
      textAlign: 'center',      
  },
  palette : {
    marginLeft: 10,
    marginRight: 10,
    padding: 9,
    width: 90,
    margin: 0,
    marginBottom: 6,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#9F5EFF',  
  },
});

