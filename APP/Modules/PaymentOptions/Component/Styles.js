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
    backgroundColor: Colors.appBlackColor,
    alignItems: 'center',
  },
  paymentOptions: {
    flex: 0.9,
    marginTop: 20,
    backgroundColor: Colors.appBlackColor,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  PaymentTitle: {
    backgroundColor: Colors.appBlackColor,
    padding: 10,
    color: 'white',
    alignItems: 'center',
  },
  paymentMethod: {
    backgroundColor: Colors.appBlackColorLight,
    width: '90%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 14,
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
