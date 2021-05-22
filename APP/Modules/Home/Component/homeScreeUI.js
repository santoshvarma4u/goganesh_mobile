import React, {useState, useEffect} from 'react';
import {Text, View, Left, Button, StyleSheet, Image} from 'react-native';

import styles from './Styles';
import {Icon} from 'react-native-elements';
import HomeController from '../Controller/homeController';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import {SliderBox} from 'react-native-image-slider-box';
function HomeScreen() {
  const [sliderImgs, setSliderImgs] = useState([]);
  const {data, success} = HomeController.useGetPromoImages();

  useEffect(() => {
    if (success) {
      setSliderImgs(data.map(i => `http://192.168.0.106:3000/${i.promoImage}`));
    }
  }, [data, success]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.upperContainer}>
        <View style={styles.centralCardView}>
          <View style={styles.depositCard}>
            <Text style={styles.text}>DEPOSIT</Text>
            <Icon name="file-upload" color="white" size={34} />
          </View>
          <View style={styles.blankCard} />
          <View style={styles.withdrawCard}>
            <Text style={styles.text}>WITHDRAW</Text>
            <Icon name="file-download" color="white" size={34} />
          </View>
        </View>
        <View style={styles.centreCard}>
          <Image style={styles.image} source={images.logo} />
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.lowerBox1}>
          <SliderBox
            images={sliderImgs}
            dotColor={Colors.appPrimaryColor}
            inactiveDotColor={Colors.appPrimaryColor}
            paginationBoxVerticalPadding={20}
            ImageComponentStyle={{overflow: 'hidden'}}
            autoplay
            circleLoop
          />
        </View>
        <View style={styles.createText}>
          <Icon name="add" color="white" size={20} />
          <Text style={styles.createTextOnly}>Create ID</Text>
        </View>
        {/*<View style={styles.promotionCard} />*/}
        <View style={styles.createAnnouncement}>
          <Text style={styles.tipsText}>Tips & Announcements</Text>
          <Text style={styles.tipsSubText}>No Data Available</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
