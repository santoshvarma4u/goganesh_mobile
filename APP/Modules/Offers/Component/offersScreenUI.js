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
      setOfferImages(
        data.map(i => `http://192.168.29.221:3000/${i.oferrimage}`),
      );
    }
  }, [data, success]);

  console.log('1110987654345678945678');
  console.log(data);
  return (
    <View style={styles.containerMain}>
      <View></View>
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Offers</Text>
        </View>
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
        <View style={styles.offersCard}></View>
        <View style={styles.offersCard}></View>
      </View>
    </View>
  );
}

export default OffersScreen;
