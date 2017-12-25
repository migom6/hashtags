import React, { Component } from 'react';
import {
  View,
  Share,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native';

class Social extends Component {

  onClick() {
    // Share.share({
    //   ...Platform.select({
    //     ios: {
    //       message: 'Have a look on : ',
    //       url: this.props.url,
    //     },
    //     android: {
    //       message: 'Have a look on : \n',
    //       uri: this.props.url
    //     }
    //   }),
    //   title: 'Wow, did you see that?'
    // }, {
    //     ...Platform.select({
    //       ios: {
    //         // iOS only:
    //         excludedActivityTypes: [
    //           'com.apple.UIKit.activity.PostToTwitter'
    //         ]
    //       },
    //       android: {
    //         // Android only:
    //         dialogTitle: 'Share : ' + this.props.title
    //       }
    //     })
    //   });

    const data = new FormData();
    data.append('name', 'testName'); // you can append anyone.
    data.append('file', {
      uri: this.props.url,
      type: 'image/jpeg', // or photo.type
      // type: 'text/plain',
      name: 'file'
    });
    // let xhr = new XMLHttpRequest();
    // xhr.open(POST, 'https://requestb.in/129uzc51', true);
    // xhr.onload = () => {
    //   console.log('response from server');
    //   console.log(this.status);
    //   console.log(this.response);
    // }
    // xhr.send(data);
    fetch("http://172.17.11.206:5000/", {
      // method: 'mutipart/form-data',
      method: 'POST',
      encoding: 'multipart/form-data',
      body: data
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.props.updateTags(responseJson.hashtags)
      })
      .catch((error) => {
        console.error(error);
      });
    // fetch('http://192.168.43.165:5000')
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => { this.onClick(); }}
        >
          <Text style={{ alignSelf: 'center', color: 'white', backgroundColor: 'red', padding: 5, margin: 20 }}>
            Update tags
            </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Social;