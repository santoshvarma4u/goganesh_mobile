import moment from 'moment';
import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {Chip, Divider} from 'react-native-paper';
import {Modal} from 'react-native-paper';
import {userFriendlyPaymentMessage} from '../../../Constants';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import {removeHttpOrWww} from '../../../Utils';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// pymid:24
// uid:31
// sdid:null
// bid:null
// upiId:null
// paymentMethod:Bank
// paymentAmount:100
// paymentType:CR
// paymentStatus:Rejected
// referral_code:FGAG01
// paymentReciept:images/regSite-deposits/depositpayreciept-1663988844980-927531935rn_image_picker_lib_temp_71e862a4-9d6a-4ec7-bc03-15e6e8c6b52b.jpg
// creadtedtime:2022-09-24T03:07:25.000Z
// updatedtime:2022-09-24T03:07:25.000Z
// isWallet:true
// remarks:Deposit into wallet - UPI- screenshot approval
// reason:Duplicate Payment Screenshot
// botVerified:false
// utr:NA
// referenceId:null
// approved_rejected_time:null
// processing_time:null
// updated_by:null
// sd:null

const RenderDetails = ({title, value}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography style={{color: Colors.appWhiteColor}}>{title}</Typography>
      <Typography variant="H5" style={{color: Colors.appWhiteColor}}>
        {value}
      </Typography>
    </View>
  );
};

const PassBookDetails = ({route}) => {
  const [imageModal, showImageModel] = useState(false);
  const {item} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.transactionHeader}>
        <FGImage
          source={require('../../../Assets/Images/logo_only.png')}
          style={styles.transactionsCardImage}
          resizeMode={'contain'}
          flex={1}
        />
        {item?.sd?.sitename && (
          <Typography style={{color: Colors.appWhiteColor}}>
            {item.sd.sitename}
          </Typography>
        )}
        {item?.sd?.siteurl && (
          <Typography style={{color: Colors.appWhiteColor}}>
            {removeHttpOrWww(item.sd.siteurl)}
          </Typography>
        )}
      </View>
      <View style={styles.rowContainerHeader}>
        <View>
          <Typography color={Colors.appWhiteColor} variant={'subheader'}>
            {userFriendlyPaymentMessage(item.remarks, 'Remark')}
          </Typography>
          <View style={styles.headerUnderline} />
        </View>
        <View>
          <Chip
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor:
                item.paymentStatus === 'Accepted' ? 'green' : 'red',
            }}
            textStyle={{color: Colors.appWhiteColor}}>
            <Typography variant="caption">{item.paymentStatus}</Typography>
          </Chip>
          <Typography variant="caption" style={{color: Colors.appWhiteColor}}>
            Time Taken :{' '}
            {item.approved_rejected_time && item.creadtedtime
              ? moment(item.approved_rejected_time).diff(
                  moment(item.creadtedtime),
                  'minutes',
                )
              : ''}
          </Typography>
        </View>
      </View>
      {/*
      transaction details
    */}
      <View style={styles.transactionContainer}>
        <Typography
          style={{
            color: Colors.appWhiteColor,
          }}
          variant={'subheader'}>
          Transactions Details
        </Typography>
        <Divider style={{backgroundColor: Colors.appWhiteColor, height: 1}} />
        <RenderDetails title={'Coins'} value={item.paymentAmount} />
        <RenderDetails title={'Reference ID'} value={item.pymid} />
        <RenderDetails title={'Payment Method'} value={item.paymentMethod} />
        <RenderDetails
          title={'Payment Type'}
          value={item.paymentType === 'CR' ? 'Deposit' : 'Withdraw'}
        />
        <RenderDetails
          title={'Request Date'}
          value={moment(item.creadtedtime).format('DD MMM YY hh:mm A')}
        />
        <RenderDetails
          title={'Approved/Rejected Date'}
          value={
            item.approved_rejected_time
              ? moment(item.approved_rejected_time).format('DD MMM YY hh:mm A')
              : 'NA'
          }
        />
      </View>
      {/*
      remarks
    */}
      <View style={styles.transactionContainer}>
        <Typography
          style={{
            color: Colors.appWhiteColor,
          }}
          variant={'subheader'}>
          Remarks
        </Typography>
        <Divider style={{backgroundColor: Colors.appWhiteColor, height: 1}} />
        <Typography
          style={{
            color: Colors.appWhiteColor,
          }}>
          {item.remarks}
        </Typography>
        {item.reason && (
          <Typography
            variant={'caption'}
            style={{
              color: Colors.appWhiteColor,
            }}>
            Reason: {item.reason}
          </Typography>
        )}
      </View>
      {/*
        Payment Details
      */}
      <View style={styles.transactionContainer}>
        <Typography
          style={{
            color: Colors.appWhiteColor,
          }}
          variant={'subheader'}>
          Payment Details
        </Typography>
        <Divider
          style={{
            backgroundColor: Colors.appWhiteColor,
            height: 1,
            marginBottom: 14,
          }}
        />
        <ImageModal
          resizeMode="contain"
          imageBackgroundColor="#000000"
          style={{
            width: 9 * 10,
            height: 16 * 10,
            marginHorizontal: 10,
          }}
          source={{
            uri: `${env}${item.paymentReciept}`,
          }}
        />
      </View>
      <Modal
        visible={imageModal}
        dismissable={true}
        onDismiss={() => {
          showImageModel(false);
        }}>
        <FGImage
          style={{
            marginHorizontal: 20,
            width: screenWidth - 40,
            height: (screenHeight * 3) / 4,
          }}
          source={{
            uri: `${env}${item.paymentReciept}`,
          }}
        />
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColor,
    paddingHorizontal: 20,
  },
  transactionHeader: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUnderline: {
    borderBottomColor: Colors.appPrimaryColor,
    borderBottomWidth: 3,
    marginTop: 5,
    width: 40,
    marginLeft: 20,
  },
  transactionContainer: {
    padding: 8,
    backgroundColor: Colors.backgroundColorLight,
    borderRadius: 10,
    marginVertical: 10,
  },
  rowContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  transactionsCardImage: {
    height: 75,
    width: 75,
    borderRadius: 40,
    backgroundColor: Colors.appBlackColor,
  },
});

export default PassBookDetails;
