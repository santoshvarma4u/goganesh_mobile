import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },
  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  SignINCard: {
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  SignInTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    height: 50,
    margin: 12,
    borderRadius: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 50,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 4,
  },
  nextButton: {
    borderRadius: 10,
    marginTop: 20,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
