import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import BankEntryComponent from '../components/bankEntryComponent';
import {Avatar, Chip, Icon, Overlay} from 'react-native-elements';
function PaymentsScreen({navigation}) {
  const [visible, setVisible] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={{padding: 10}}>Name</Text>
          <Text style={{padding: 10}}>+91 9959052330</Text>
        </View>
        <View style={styles.bankDetails}>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
            </Text>
            <Chip
              onPress={toggleOverlay}
              containerStyle={{
                marginLeft: 'auto',
              }}
              title="Add New"
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              <BankEntryComponent />
            </Overlay>
          </View>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
            </Text>
            <Chip
              containerStyle={{
                marginLeft: 'auto',
              }}
              title="Add New"
            />
          </View>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
            </Text>
            <Chip
              containerStyle={{
                marginLeft: 'auto',
              }}
              title="Add New"
            />
          </View>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
            </Text>
            <Chip
              containerStyle={{
                marginLeft: 'auto',
              }}
              title="Add New"
            />
          </View>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
            </Text>
            <Chip
              containerStyle={{
                marginLeft: 'auto',
              }}
              title="Add New"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },

  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
  },
  profileDetails: {
    flex: 0.15,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  bankDetails: {
    flex: 0.75,
    padding: 15,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  bankCardDetails: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
});
export default PaymentsScreen;
