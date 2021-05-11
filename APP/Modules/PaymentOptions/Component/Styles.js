import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
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
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  PaymentTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  paymentMethod: {
    backgroundColor: 'black',
    width: '90%',
    flex: 0.15,

    flexDirection: 'row',
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
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
  },
});
