import React, {Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class Cam extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 20, color: 'black' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.button}>
                  <Image
                    source={require('./assets/click.png')}
                  />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
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