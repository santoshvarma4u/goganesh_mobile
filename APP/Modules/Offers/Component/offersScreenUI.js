import React, {useState, useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import styles from './Styles';
import {SliderBox} from 'react-native-image-slider-box';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import OffersController from '../Controller/offeresController';
function OffersScreen({navigation}) {
  const [offerImages, setOfferImages] = useState(false);
  const {data, success} = OffersController.useGetOfferImages();

  useEffect(() => {
    if (success) {
      const offers = [];
      data.map(i => offers.push(`http://139.59.11.217:3000/${i.oferrimage}`));
      setOfferImages(offers)
    }
  }, [data, success]);

  return (
    <View style={styles.containerMain}>
      <View />
      <View style={styles.offersContainer}>
        <View style={styles.offersCard}>
          <SliderBox
            images={offerImages}
            dotColor={Colors.appPrimaryColor}
            inactiveDotColor={Colors.appPrimaryColor}
            paginationBoxVerticalPadding={20}
            ImageComponentStyle={{overflow: 'hidden'}}
            autoplay
            circleLoop
          />
        </View>
      </View>
    </View>
  );
}

export default OffersScreen;
