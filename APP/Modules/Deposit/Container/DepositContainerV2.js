/* eslint-disable no-alert */
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import CONSTANTS from '../../../Constants';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import metrics from '../../../Theams/Metrics';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import withPreventDoubleClick from '../../../Utils/withPreventDoubleClick';
import ErrorPage from '../../Common/ErrorPage';
import FGImagePicker from '../../Common/ImagePicker';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import depositController from '../Controller/depositController';
import DepositController from '../Controller/depositController';
import PaymentDetail from './PaymentDetail';
import PaymentMedium from './PaymentMedium';

const DepositContainerV2 = props => {
  const [amount, setAmount] = useState(' ');
  const [progress, setProgress] = useState(false);
  const [uid, setUid] = useState('');
  const {
    sdid,
    planType,
    userName,
    depositCoins,
    requestStatus,
    usdid = null,
  } = props.route.params;

  const [selectedMedium, setSelectedMedium] = useState({
    type: '',
    data: [],
  });

  const [filePath, setFilePath] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [isCreatingId, setIsCreatingID] = useState(false);
  const [paymentMasters, setPaymentMasters] = useState([]);

  const ButtonEx = withPreventDoubleClick(Button);

  const {data, request, loading, error} = depositController.getPayeeDetails();

  useEffect(() => {
    if (data) {
      const masters = [];
      data.map(item => {
        const index = masters.findIndex(
          master => master.paymenttype === item.paymenttype,
        );
        if (index > -1) {
          masters[index].data.push(item);
        } else {
          masters.push({
            paymenttype: item.paymenttype,
            data: [item],
          });
        }
      });
      setPaymentMasters(masters);
    }
  }, [data]);

  useEffect(() => {
    setAmount(depositCoins);
    getUID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {}
  };
  const navigation = useNavigation();

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });

  const setImageUpLoadProgress = progressEvent => {
    const {loaded, total} = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setUploadProgress(percent);
  };

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    FGImagePicker.launchImageLibrary(options, response => {
      /**
       * response {
       *  didCancel: boolean,
       *  error: string,
       *  errorMessage: string,
       *  assets: array of selected media
       * }
       */

      if (response.didCancel) {
        alert('Please select image to upload');
      } else if (response.error) {
        alert(response.error);
      } else {
        if (response.assets.length > 0) {
          setFilePath(response.assets[0]);
        } else {
          alert('Please select image to upload');
        }
      }
    });
  };

  const handlePayment = () => {
    // Handle Payment
    if (!filePath) {
      return alert('please upload payment reference image');
    }
    if (!paymentType) {
      return alert('please select payment type');
    }
    setIsCreatingID(true);
    setProgress(true);
    if (requestStatus === 'wallet') {
      const paymentMethod = paymentType;
      DepositController.depositIntoWallet(
        parseInt(uid),
        paymentMethod,
        depositCoins,
        'CR',
        true,
        filePath,
        CONSTANTS.DEPOSIT_INTO_WALLET_UPI,
        null,
        setImageUpLoadProgress,
        null,
        usdid,
      ).then(data => {
        setProgress(false);
        setIsCreatingID(false);
        navigation.dispatch(resetAction);
      });
    } else if (requestStatus === 'new') {
      DepositController.submitIntialDeposit(
        parseInt(uid),
        sdid,
        paymentType,
        depositCoins,
        'CR',
        filePath,
        CONSTANTS.DEPOSIT_INTO_SITE_UPI_CREATE_ID,
        setImageUpLoadProgress,
      ).then(({data}) => {
        DepositController.submitData(
          parseInt(uid),
          sdid,
          planType,
          paymentType,
          'Pending',
          filePath,
          userName,
          depositCoins,
          data.data.paymentID,
          setImageUpLoadProgress,
        ).then(data => {});
        setProgress(false);
        setIsCreatingID(false);
        navigation.dispatch(resetAction);
      });
    } else {
      const paymentMethod = paymentType;
      DepositController.submitDataForMyID(
        parseInt(uid),
        sdid,
        paymentMethod,
        depositCoins,
        'CR',
        filePath,
        CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_UPI,
        null,
        null,
        usdid,
      )
        .then(data => {
          setProgress(false);
          setIsCreatingID(false);
          navigation.dispatch(resetAction);
        })
        .catch(error => {
          setProgress(false);
          setIsCreatingID(false);
        });
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorPage
        onRetryPress={() => {
          request();
        }}>
        {error}
      </ErrorPage>
    );
  }

  return (
    <View style={styles.container}>
      {isCreatingId ? (
        <LoadingIndicator loadingText={'Please wait....' + uploadProgress} />
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Typography
          variant="H2"
          style={[
            styles.text,
            {
              textAlign: 'center',
            },
          ]}>
          Pay ₹{amount}/-
        </Typography>
        <View style={styles.payRow}>
          <Typography style={styles.text} variant="H3">
            Pay Manually
          </Typography>
        </View>
        <View style={styles.underline} />
        <View
          style={{
            marginVertical: 10,
            backgroundColor: Colors.appBlackColorLight,
            padding: 10,
            borderRadius: metrics.borderRadius / 2,
          }}>
          <FlatList
            data={paymentMasters}
            horizontal
            renderItem={({item}) => {
              return (
                <PaymentMedium
                  data={item}
                  selectedMedium={selectedMedium}
                  setSelectedMedium={setSelectedMedium}
                  setPaymentType={setPaymentType}
                  isSelected={selectedMedium.type === item.paymenttype}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        {/*
            show details below depending on selected medium
        */}
        <PaymentDetail selectedMedium={selectedMedium} />
        {/*
        upload component for proof of payment
      */}
        {filePath?.uri ? (
          <View
            style={[
              styles.depositScreenshotCard,
              {
                alignItems: 'flex-end',
              },
            ]}>
            <IconButton
              icon="delete"
              mode="contained"
              color={Colors.appRedColor}
              onPress={() => setFilePath('')}>
              Upload
            </IconButton>
            <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.depositScreenshotCard}
            onPress={() => chooseFile()}>
            <Icon
              name="plus-circle"
              color={Colors.appWhiteColor}
              size={36}
              type="material-community"
            />
            <Typography style={styles.textCenter}>
              Click here to upload payment screenshot
            </Typography>
          </TouchableOpacity>
        )}
        <View>
          <ButtonEx
            mode="contained"
            disabled={!filePath?.uri || progress}
            onPress={handlePayment}>
            <Typography>Submit</Typography>
          </ButtonEx>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.appBlackColor,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  text: {
    color: Colors.appWhiteColor,
    marginRight: 4,
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.appWhiteColor,
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  underline: {
    borderBottomColor: Colors.appPrimaryColor,
    borderBottomWidth: 2,
    marginVertical: 5,
    width: 60,
  },
  depositScreenshotCard: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.appPrimaryColor,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    padding: 5,
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWallet: wallet => dispatch(setWalletBalance(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositContainerV2);
