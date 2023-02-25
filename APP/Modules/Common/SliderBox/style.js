import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
export const styles = StyleSheet.create({
  carouselImageStyle: {
    width: width,
    resizeMode: 'contain',
    height: 200,
  },
  previewImageContainerStyle: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImageStyle: {
    width: width,
    resizeMode: 'contain',
    height: 400,
  },
});
