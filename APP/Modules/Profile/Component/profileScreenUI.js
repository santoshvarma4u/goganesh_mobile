import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {Pressable, View} from 'react-native';
import {Button} from 'react-native-paper';
import {removeUserDetails} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import metrics from '../../../Theams/Metrics';
import FGImage from '../../Common/FGImage';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import styles from './Styles';
function ProfileScreen({navigation}) {
  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);
  const [memberSince, setMemberSince] = useState(false);

  const getName = async () => {
    try {
      return await Storage.getItemSync(StorageKeys.NAME);
    } catch (error) {}
  };
  const getPhone = async () => {
    try {
      return await Storage.getItemSync(StorageKeys.PHONE);
    } catch (error) {}
  };

  const getMemberSince = async () => {
    try {
      return await Storage.getItemSync(StorageKeys.MEMBER_SINCE);
    } catch (error) {}
  };

  useEffect(() => {
    getName().then(data => setName(data));
    getPhone().then(data => setPhone(data));
    getMemberSince().then(data => setMemberSince(data));
  }, []);
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <Pressable
          style={{
            position: 'absolute',
            top: 15,
            right: 30,
            flexDirection: 'row',
          }}
          onPress={() => {
            removeUserDetails();
            navigation.navigate('Auth');
          }}>
          <Typography
            color={Colors.appWhiteColor}
            variant={'P1'}
            style={{
              marginHorizontal: 5,
            }}>
            Logout
          </Typography>
          <Icon name="logout" size={20} color={Colors.appPrimaryColor} />
        </Pressable>
        <View style={styles.profileIcon}>
          <FGImage
            source={images.userprofile}
            style={{
              width: 120,
              height: 120,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={styles.profileDetails}>
          <Typography color={Colors.appWhiteColor} variant={'H1'}>
            {name}
          </Typography>
          <Typography
            color={Colors.appWhiteColor}
            variant={'P1'}
            style={{
              marginVertical: 10,
            }}>
            <Typography color={Colors.appWhiteColor}>🇮🇳</Typography>
            {'  '}+ 91-{phone}
          </Typography>
          <Button
            mode="contained"
            color={Colors.appPrimaryColor}
            uppercase={false}
            style={{
              alignSelf: 'center',
              marginVertical: 10,
              borderRadius: metrics.borderRadius,
            }}
            onPress={() => {
              navigation.navigate('ChangePassword', {
                name: name,
                phone: phone,
                type: 'profile',
              });
            }}>
            <Typography variant={'H3'} color={Colors.appBlackColor}>
              Change Password
            </Typography>
          </Button>
          <Typography color={Colors.appWhiteColor} variant={'P1'}>
            {memberSince
              ? `Member Since ${moment(memberSince).format('D MMMM YY')}`
              : ''}
          </Typography>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
