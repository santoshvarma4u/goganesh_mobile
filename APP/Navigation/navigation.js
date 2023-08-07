/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HeaderBackButton} from '@react-navigation/elements';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import PassbookIcon from '../Assets/svgs/passbookIcon';
// import ChatContainer from '../Modules/Chat/Container/ChatContainer';
import ChatScreen from '../Modules/Chat/ChatScreen';
import TypographyStyles from '../Modules/Common/Text/Text.styles';
import CreateIDScreen from '../Modules/CreateID/Container/createIDIndex';
import DepositContainer from '../Modules/Deposit/Container/DepositContainer';
import DepositContainerV2 from '../Modules/Deposit/Container/DepositContainerV2';
import DepositScreen from '../Modules/Deposit/Container/depositIndex';
import HelpScreen from '../Modules/Help/Container/helpIndex';
import NotificationScreen from '../Modules/Home/Component/notificationScreenUI';
import HomeScreen from '../Modules/Home/Container/homeIndex';
import HowItWorks from '../Modules/HowItWorks';
import IDsScreenPage from '../Modules/IDs/Container/IDsIndex';
import ForgotPassWord from '../Modules/Login/Containers/Signin/ForgotPassword';
import SignInContainer from '../Modules/Login/Containers/Signin/SignInindex';
import SignUpContainer from '../Modules/Login/Containers/Signin/SignUpContainer';
import UserOtpLoginContainer from '../Modules/Login/Containers/Signin/UserOtpLoginContainer';
import VerifyUserContainer from '../Modules/Login/Containers/Signin/VerifyUserContainer';
import OffersScreen from '../Modules/Offers/Container/offersIndex';
import PassBookDetails from '../Modules/Passbook/Container/PassbookDetails';
import PassbookScreen from '../Modules/Passbook/Container/passbookIndex';
import PaymentsScreen from '../Modules/PaymentDetails/Container/paymentDetailsIndex';
import PaymentOptionsScreen from '../Modules/PaymentOptions/Container/paymentOptionsIndex';
import ProfileScreen from '../Modules/Profile/Container/profileIndex';
import RulesScreen from '../Modules/Rules/Container/rulesIndex';
import CustomSidebarMenu from '../Modules/SideMenu/Component/sidemenu';
import SiteDetailsContainer from '../Modules/SiteDetails/Containers/SiteDetailComponent';
import Splash from '../Modules/Splash/Container/splashIndex';
import WithdrawForm from '../Modules/Withdraw/Components/WithdrawUI';
import WithDrawContainer from '../Modules/Withdraw/Containers/WidthdrawContainer';
import Colors from '../Theams/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const appHeaderStyle = {
  ...TypographyStyles.H3,
  color: Colors.appThemeTextColor,
  fontSize: 20,
};

export const _navigationRef = React.createRef();

export function CustomNavigationBar({
  navigation,
  back = true,
  route,
  headerName,
}) {
  const {name} = route || {};
  return (
    <Appbar.Header
      style={{
        backgroundColor: Colors.appBlackColor,
      }}>
      <View
        style={{
          backgroundColor: Colors.appWhiteColor,
          height: 30,
          width: 30,
          borderRadius: 20,
          marginLeft: 18,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      </View>
      <Appbar.Content
        title={headerName ?? name}
        titleStyle={{
          ...TypographyStyles.H3,
          color: Colors.appWhiteColor,
          fontSize: 22,
          marginTop: 10,
          padding: 0,
        }}
        subtitle={'______'}
        subtitleStyle={{
          ...TypographyStyles.H3,
          color: Colors.appPrimaryColor,
          fontSize: 40,
          marginTop: 0,
          padding: 0,
          lineHeight: 10,
        }}
      />
    </Appbar.Header>
  );
}

function logoutAndResetNavigation() {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Auth'}],
  });
  _navigationRef?.current?.dispatch(resetAction);
}

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="VerifyUser"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="VerifyUser"
        component={VerifyUserContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInContainer}
        options={({navigation}) => ({
          header: props => (
            <CustomNavigationBar
              {...props}
              navigation={navigation}
              back={true}
              headerName="Login"
            />
          ),
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpContainer}
        options={({navigation}) => ({
          header: props => (
            <CustomNavigationBar
              {...props}
              navigation={navigation}
              back={true}
              headerName="Register"
            />
          ),
        })}
      />
      <Stack.Screen
        name="OTPLogin"
        component={UserOtpLoginContainer}
        options={({navigation}) => ({
          header: props => (
            <CustomNavigationBar
              {...props}
              navigation={navigation}
              back={true}
              headerName="Enter Verification Code"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassWord}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: 'Forgot Password ',
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={({navigation}) => ({
          header: props => (
            <CustomNavigationBar
              {...props}
              navigation={navigation}
              back={true}
              headerName="How to use"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Rules"
        component={RulesScreen}
        options={({navigation}) => ({
          headerTitle: 'Terms & Conditions',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export function AppContainer() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={MyDrawer} />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: Colors.appPrimaryColor},
        headerTitleStyle: appHeaderStyle,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        screenOptions={{
          headerShown: false,
        }}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor, height: 50},
          headerTitle: props => (
            <View
              style={{
                flexDirection: 'row',
              }}>
              {/*<SmallLogo*/}
              {/*  width={30}*/}
              {/*  height={30}*/}
              {/*  color={Colors.appThemeTextColor}*/}
              {/*/>*/}
              {/* <Typography variant="title" color={Colors.appThemeTextColor}>
                FG Punt
              </Typography> */}
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            {marginLeft: 'auto'},
            (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginLeft: 10,
                }}>
                <Icon
                  name="menu"
                  size={24}
                  color={Colors.appPrimaryColor}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            )
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="bank"
                  size={20}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Payments')}
                  type="material-community"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="notifications"
                  size={24}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Notification')}
                />
              </View>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="CreateID"
        // hide tabBar
        component={CreateIDScreen}
        options={({navigation}) => ({
          headerTitle: 'Create ID',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          tintColor: '#ffffff',
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={() => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerTitle: 'Profile',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appThemeTextColor}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={({navigation}) => ({
          headerTitle: 'Help',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appThemeTextColor}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={({navigation}) => ({
          headerTitle: 'Bank Details',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appThemeTextColor}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptionsScreen}
        options={({navigation}) => ({
          headerTitle: 'Payment Method',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.navigate('PaymentOptions');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DepositV2"
        component={DepositContainerV2}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={({navigation}) => ({
          headerTitle: 'Notifications',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawForm}
        options={({navigation}) => ({
          headerTitle: 'Withdraw',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DepositForm"
        component={DepositContainer}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerTitleStyle: appHeaderStyle,
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="WithdrawContainer"
        component={WithDrawContainer}
        options={({navigation}) => ({
          headerTitle: 'Withdraw',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      {/* <Stack.Screen
        name="Support"
        component={ChatContainer}
        options={({navigation}) => ({
          headerTitle: 'Support',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      /> */}
      <Stack.Screen
        name="Rules"
        component={RulesScreen}
        options={({navigation}) => ({
          headerTitle: 'Terms & Conditions',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="HowItWorks"
        component={HowItWorks}
        options={({navigation}) => ({
          header: props => (
            <CustomNavigationBar
              {...props}
              navigation={navigation}
              back={true}
              headerName="How to use"
            />
          ),
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ForgotPassWord}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: 'Change Password ',
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const OffersStackNavigator = () => {
  return <Stack.Navigator />;
};
const PassbookStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: Colors.appPrimaryColor},
        headerTitleStyle: appHeaderStyle,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Passbook"
        component={PassbookScreen}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor, height: 50},
          headerTitle: 'Passbook',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: Colors.appWhiteColor,
                marginLeft: 10,
              }}>
              <Icon
                name="menu"
                size={24}
                color={Colors.appPrimaryColor}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="bank"
                  size={20}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Payments')}
                  type="material-community"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="notifications"
                  size={24}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Notification')}
                />
              </View>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PassbookDetails"
        component={PassBookDetails}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: 'Passbook Details',
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const IDsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: Colors.appPrimaryColor},
        headerTitleStyle: appHeaderStyle,
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="IDs"
        component={IDsScreenPage}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor, height: 50},
          headerTitle: 'IDs',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 30,
                borderRadius: 20,
                backgroundColor: Colors.appWhiteColor,
                marginLeft: 10,
              }}>
              <Icon
                name="menu"
                size={24}
                color={Colors.appPrimaryColor}
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="bank"
                  size={20}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Payments')}
                  type="material-community"
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  backgroundColor: Colors.appWhiteColor,
                  marginRight: 10,
                }}>
                <Icon
                  name="notifications"
                  size={24}
                  color={Colors.appPrimaryColor}
                  onPress={() => navigation.navigate('Notification')}
                />
              </View>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="CreateID"
        component={CreateIDScreen}
        options={({navigation}) => ({
          headerTitle: 'Create ID',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.navigate('IDs');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptionsScreen}
        options={({navigation}) => ({
          headerTitle: 'Payment Method',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.navigate('PaymentOptions');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DepositV2"
        component={DepositContainerV2}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="IDDetails"
        component={SiteDetailsContainer}
        options={({navigation}) => ({
          headerTitle: 'ID Details',
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor={Colors.appWhiteColor}
              onPress={() => {
                navigation.pop();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSidebarMenu {...props} />}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent', //here change it
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: config => <Icon size={32} name={'home'} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.appBlackColorLight,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName, type;
          if (route.name === 'Home') {
            iconName = 'home';
            type = 'foundation';
          } else if (route.name === 'Passbook') {
            return (
              <PassbookIcon
                width={30}
                height={26}
                color={color}
                style={{marginLeft: 7}}
              />
            );
          } else if (route.name === "ID's") {
            iconName = 'switch-account';
          }
          return <Icon size={24} type={type} name={iconName} color={color} />;
        },
        tabBarActiveTintColor: Colors.appPrimaryColor,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Passbook" component={PassbookStackNavigator} />
      <Tab.Screen
        name="ID's"
        component={IDsStackNavigator}
        initialRouteName="ID's"
      />
      {/* <Tab.Screen name="Chat" component={ChatScreen} /> */}
    </Tab.Navigator>
  );
};

export {logoutAndResetNavigation};
