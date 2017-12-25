import React, {Component} from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Camera extends Component {
    click = () => {
        this.props.navigate.navigate('Cam')
    }
  render() {
    return (
        <TouchableOpacity onPress={this.click} style = {styles.button}>
            <Image
              source={require('./assets/click.png')}
            />
        </TouchableOpacity>
    );
  }
}



const styles = StyleSheet.create({
    button:{
        position: 'absolute',
        bottom: 10,
        right: 170,
        shadowColor: '#000000',
        shadowOffset: {
          width: 3,
          height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 1.0
      }
});
