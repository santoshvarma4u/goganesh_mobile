// Card with accordion for passbook
// posses a list of passbook item with details of transaction

import moment from 'moment';
import React, {useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {userFriendlyPaymentMessage} from '../../../Constants';
import Colors from '../../../Theams/Colors';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';

/**
 * It takes a title and a value and returns a view with the title and value in it
 * @param title - The title of the field
 * @param value - The value to be displayed
 * @returns A function that returns a view
 */
const RenderTitleAndValue = ({title, value, isButton, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
      }}>
      <Typography variant={'h4'} style={{color: Colors.appWhiteColor}}>
        {title}
      </Typography>
      {isButton ? (
        <TouchableOpacity
          mode="contained"
          onPress={onPress}
          style={{
            backgroundColor: Colors.appGreenColor,
            borderRadius: 20,
            padding: 5,
          }}>
          <Typography variant={'h4'} style={{color: Colors.appWhiteColor}}>
            View More
          </Typography>
        </TouchableOpacity>
      ) : (
        <Typography variant={'h4'} style={{color: Colors.appWhiteColor}}>
          {value}
        </Typography>
      )}
    </View>
  );
};

const PassbookCard = ({item, navigation}) => {
  const [accordion, setAccordion] = useState(false);

  return (
    <Pressable
      style={styles.transactionsCard}
      onPress={() => {
        setAccordion(!accordion);
      }}>
      <View style={styles.mainView}>
        <FGImage
          source={
            item?.sd?.siteimage
              ? {uri: item.sd.siteimage}
              : require('../../../Assets/Images/logo_only.png')
          }
          style={styles.transactionsCardImage}
          resizeMode={'contain'}
          flex={1}
        />
        <View
          style={{
            flex: 1,
          }}>
          <Typography
            variant="H5"
            style={{
              color: Colors.appWhiteColor,
            }}>
            {userFriendlyPaymentMessage(item.remarks, 'Remark')}
          </Typography>
          {item?.sd?.sitename && (
            <Typography style={{color: Colors.appWhiteColor}}>
              {item.sd.sitename}
            </Typography>
          )}
          <Typography variant="caption" style={{color: Colors.appWhiteColor}}>
            {moment(item.creadtedtime).format('lll').toString()}
          </Typography>
        </View>
        <View>
          <Typography
            variant="H4"
            style={{
              color: Colors.appWhiteColor,
              textAlign: 'right',
            }}>
            {item.paymentAmount}
          </Typography>
          <Typography
            style={
              item.paymentStatus === 'Accepted'
                ? {color: 'green', margin: 5}
                : {color: 'red', margin: 5}
            }>
            {item.paymentStatus}
          </Typography>
        </View>
      </View>
      {accordion && (
        <View style={styles.accordionView}>
          <RenderTitleAndValue
            title={'Details'}
            isButton
            onPress={() => {
              navigation.navigate('PassbookDetails', {item});
            }}
          />
          <RenderTitleAndValue title={'Coins'} value={item.paymentAmount} />
          <RenderTitleAndValue title={'Reference No.'} value={item.pymid} />
          <RenderTitleAndValue
            title={'Request Date'}
            value={item.creadtedtime}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = {
  transactionsCard: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.backgroundColorLight,
  },
  mainView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  transactionsCardImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.appBlackColor,
  },
  accordionView: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.appBlackColor,
  },
};

export default PassbookCard;
