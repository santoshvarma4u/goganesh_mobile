import React, {useState, useEffect} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import {env} from '../../../Network/api/server';
import Animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import LinearGradient from '../../Common/LinearGradient';
import LottieView from '../../Common/Lottie';
import FGSliderBox from '../../Common/SliderBox';
import {Typography} from '../../Common/Text';
import OffersController from '../Controller/offeresController';
import styles from './Styles';

function OffersScreen({navigation}) {
  const [offerImages, setOfferImages] = useState(false);
  const {data, success} = OffersController.useGetOfferImages();

  useEffect(() => {
    if (success) {
      const offers = [];
      data.map(i => offers.push(`${env}${i.oferrimage}`));
      setOfferImages(offers);
    }
  }, [data, success]);

  return (
    <LinearGradient
      style={styles.containerMain}
      colors={[Colors.appPrimaryColor, Colors.appBlackColor]}>
      <View />
      <View style={styles.offersContainer}>
        {offerImages.length > 0 ? (
          <View style={styles.offersCard}>
            <FGSliderBox
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
            <Typography
              variant="H3"
              color={Colors.appWhiteColor}
              style={{
                marginTop: 50,
              }}>
              No Offers Found!
            </Typography>
            <LottieView source={Animations.not_found} autoPlay loop />
          </>
        )}
      </View>
    </LinearGradient>
  );
}

export default OffersScreen;
