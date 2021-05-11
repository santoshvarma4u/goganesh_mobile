import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';
export default StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },
  depositTitile: {
    marginTop: 10,
    marginLeft: 10,
  },
  phoneNumber: {
    marginLeft: 'auto',
    marginTop: 10,
  },
  offersContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  depositDetailsCard: {
    flex: 0.25,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  depositDetailsCardForBank: {
    flex: 0.3,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  depostScreenshotCard: {
    flex: 0.65,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },

  depositTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  imageStyle: {
    padding: 5,
    width: 150,
    height: 300,
    marginBottom: -15,
  },
});
