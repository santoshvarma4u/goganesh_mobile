import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Chip, Icon} from 'react-native-elements';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import styles from './Styles';
function ProfileScreen({navigation}) {
  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);

  const getName = async () => {
    try {
      let name1 = await Storage.getItemSync(StorageKeys.NAME);

      return name1;
    } catch (error) {}
  };
  const getPhone = async () => {
    try {
      let phone = await Storage.getItemSync(StorageKeys.PHONE);
      return phone;
    } catch (error) {}
  };
  useEffect(() => {
    getName().then(data => setName(data));
    getPhone().then(data => setPhone(data));
  }, []);
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Icon name="person" />
        </View>
        <View style={styles.profileDetails}>
          <Typography
            color={Colors.appWhiteColor}
            style={{padding: 10}}
            variant={'H4'}>
            Name : {name}{' '}
          </Typography>
          <Typography
            color={Colors.appWhiteColor}
            style={{padding: 10}}
            variant={'H4'}>
            Phone : {phone}
          </Typography>
          <Chip
            title="Change Password"
            onPress={() => {
              navigation.navigate('ChangePassword', {
                name: name,
                phone: phone,
                type: 'profile',
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;
