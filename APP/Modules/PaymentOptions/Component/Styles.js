import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },

  paymentOptionsContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  paymentOptions: {
    flex: 0.9,
    marginTop: 20,
    backgroundColor: 'black',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  PaymentTitle: {
    backgroundColor: 'black',
    padding: 10,
    color: 'white',
  },
  paymentMethod: {
    backgroundColor: '#171616',
    width: '90%',
    flex: 0.15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  paymentTypeTitle: {
    color: 'white',
    padding: 10,
  },
  paymentIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    marginLeft: 10,
    resizeMode: 'stretch',
  },
});
