/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {RadioButton, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';

const CardItem = props => {
  const {
    title,
    subtitle,
    icon = 'clock-time-three-outline',
    onPress,
    time,
    content,
    contentSubtitle,
    checked,
  } = props;
  return (
    <Pressable
      style={{
        backgroundColor: Colors.appBlackColor,
        borderRadius: 10,
        marginVertical: 10,
        marginRight: 20,
        borderWidth: 1,
        borderColor: checked ? Colors.appPrimaryColor : Colors.appBlackColor,
        flex: 1,
      }}
      onPress={onPress}>
      {/* <Card.Title
        title={title}
        titleStyle={{
          color: Colors.appWhiteColor,
          fontSize: 18,
        }}
        subtitleStyle={{
          color: Colors.appWhiteColor,
          fontSize: 11,
        }}
        subtitle={subtitle} */}
      <View
        style={{
          flexDirection: 'row',
          marginRight: 10,
          paddingHorizontal: 20,
          marginVertical: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <Typography variant="H3" color={Colors.appWhiteColor}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="paragraph" color={Colors.appWhiteColor}>
              {subtitle}
            </Typography>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <MaterialCommunityIcons
            name={icon}
            color={Colors.appWhiteColor}
            size={30}
          />
          <View>
            <Typography color={Colors.appWhiteColor}>
              Processing time
            </Typography>
            <Typography color={Colors.appPrimaryColor}>{time}</Typography>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}>
        <Divider
          style={{
            backgroundColor: Colors.appWhiteColor,
            flex: 1,
          }}
        />
        <View>
          <Typography variant="H3" color={Colors.appWhiteColor}>
            {content}
          </Typography>
          <Typography
            color={Colors.appWhiteColor}
            style={{
              marginTop: 10,
            }}>
            {contentSubtitle}
          </Typography>
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: Colors.backgroundColor,
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}>
        {/* TODO: add correct iamges  */}
        <Image
          source={images.banktransfer}
          resizeMode="contain"
          style={{
            height: 50,
          }}
        />
      </View>
    </Pressable>
  );
};

const PaymentCard = props => {
  const {paymentMethod, setPaymentMethod, amount} = props;

  return (
    <View
      style={{
        flex: 1,
      }}>
      <RadioButton.Group
        onValueChange={val => setPaymentMethod(val)}
        value={paymentMethod}>
        {amount <= 10000 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <RadioButton value="gateway" />
            <CardItem
              title="Payment Gateway"
              subtitle="Powered by Cashfree Payments"
              time={'Instant'}
              content={'Supports all major banks'}
              contentSubtitle={
                'Debit Cards,Any Upi,PhonePe,Google Pay,Paytm,Paytm UPI & Net Banking'
              }
              onPress={() => setPaymentMethod('gateway')}
              checked={paymentMethod === 'gateway'}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <RadioButton value="screenshot" />
          <CardItem
            title={'Upload Payment\n ScreenShot'}
            subtitle=""
            time={'15-30mins'}
            content={'Supports '}
            contentSubtitle={
              'Any Upi, PhonePe, Google Pay, Paytm, Paytm UPI & Bank transfer'
            }
            onPress={() => setPaymentMethod('screenshot')}
            checked={paymentMethod === 'screenshot'}
          />
        </View>
      </RadioButton.Group>
    </View>
  );
};

export default PaymentCard;
