import React, { Component, PropTypes } from 'react'
import {
  CameraRoll,
  Image,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

export default class Gallery extends Component {

  constructor(props) {
    super(props)
    var controls = props.controls
    this.state = {
      images: [],
      selected: '',
      fetchParams: { first: 1000 },
      groupTypes: 'SavedPhotos',
    }
    this._storeImages = this._storeImages.bind(this)
    this._logImageError = this._logImageError.bind(this)
    this._selectImage = this._selectImage.bind(this)
  }

  componentDidMount() {
    // get photos from camera roll
    CameraRoll.getPhotos(this.state.fetchParams, this._storeImages, this._logImageError);
  }

  // callback which processes received images from camera roll and stores them in an array
  _storeImages(data) {
    const assets = data.edges;
    const images = assets.map( asset => asset.node.image );
    this.setState({
        images: images,
    });
  }

  _logImageError(err) {
      console.log(err);
  }

  _selectImage(uri) {
    // define whatever you want to happen when an image is selected here
    this.setState({
      selected: uri,
    });
    this.props.goShare(uri)
    console.log('Selected image: ', uri);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#27005F'}}>
        <ScrollView style={styles.container}>
            <View style={styles.imageGrid}>
            { this.state.images.map(image => {
              return (
               <TouchableHighlight key={this.state.images.indexOf(image)} activeOpacity={0.5}  onPress={() => this._selectImage(image.uri)}>
                 <Image style={styles.image} source={{ uri: image.uri }} />
               </TouchableHighlight>
             );
            })}
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      borderTopWidth: 1.0,
      borderColor: '#9F5EFF',
      marginRight: 16,
      marginLeft: 16,
      paddingTop: 14,
      flex: 1,
      backgroundColor: '#27005F',
  },
  imageGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      
  },
  image: {
      width: 120,
      height: 120,
      margin: 0,
      marginBottom: 6,
  },
});

