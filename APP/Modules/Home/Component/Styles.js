import {StyleSheet} from 'react-native';
import Colors from '../../../Theams/Colors';

export default StyleSheet.create({
  containerMain: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 1,
  },
  centreCard: {
    backgroundColor: 'black',
    width: '35%',
    height: '90%',
    position: 'absolute',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  image: {
    height: 150,
    width: 150,
  },
  createAnnouncement: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    marginTop: 40,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  tipsText: {
    color: Colors.appPrimaryColor,
  },
  tipsSubText: {
    color: 'white',
    marginVertical: 20,
  },

  createText: {
    marginTop: 20,
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: '#343232',
  },
  promotionCard: {
    flex: 0.3,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  createTextOnly: {
    color: 'black',
    marginHorizontal: 10,
  },
  centralCardView: {
    flex: 1,
    backgroundColor: 'black',
    width: '50%',
    height: '70%',
    flexDirection: 'row',
    marginHorizontal: 45,
    borderRadius: 20,
  },
  depositCard: {
    flex: 0.3,
    flexDirection: 'column',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  blankCard: {
    flex: 0.4,

    backgroundColor: 'white',
  },
  withdrawCard: {
    flex: 0.3,
    flexDirection: 'column',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  upperContainer: {
    backgroundColor: Colors.appPrimaryColor,
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  lowerContainer: {
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 0.8,
    alignItems: 'center',
  },
  lowerBox1: {
    flex: 0.4,
    flexDirection: 'column',
    marginTop: 50,
    width: '80%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  carouselCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
});
