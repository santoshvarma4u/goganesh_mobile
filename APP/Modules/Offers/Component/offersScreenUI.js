import LottieView from 'lottie-react-native';
import React, {useState, useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import Animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import OffersController from '../Controller/offeresController';
import styles from './Styles';
function OffersScreen({navigation}) {
  const [offerImages, setOfferImages] = useState(false);
  const {data, success} = OffersController.useGetOfferImages();

  useEffect(() => {
    if (success) {
      const offers = [];
      data.map(i => offers.push(`http://139.59.11.217:3000/${i.oferrimage}`));
      setOfferImages(offers);
    }
  }, [data, success]);

  return (
    <View style={styles.containerMain}>
      <View />
      <View style={styles.offersContainer}>
        {offerImages.length > 0 ? (
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
        ) : (
          <>
            <Text style={{color: '#fff', marginTop: 50,fontSize:16}}>No Offers Found!</Text>
            <LottieView source={Animations.not_found} autoPlay loop />
          </>
        )}
      </View>
    </View>
  );
}

export default OffersScreen;
