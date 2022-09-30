import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CommonActions, DrawerActions} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {Icon} from '@rneui/themed';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import SmallLogo from '../Assets/svgs/SmallLogo';
import ChatContainer from '../Modules/Chat/Container/ChatContainer';
import {Typography} from '../Modules/Common/Text';
import TypographyStyles from '../Modules/Common/Text/Text.styles';
import CreateIDScreen from '../Modules/CreateID/Container/createIDIndex';
import DepositContainer from '../Modules/Deposit/Container/DepositContainer';
import DepositContainerV2 from '../Modules/Deposit/Container/DepositContainerV2';
import DepositScreen from '../Modules/Deposit/Container/depositIndex';
import HelpScreen from '../Modules/Help/Container/helpIndex';
import NotificationScreen from '../Modules/Home/Component/notificationScreenUI';
import HomeScreen from '../Modules/Home/Container/homeIndex';
import IDsScreenPage from '../Modules/IDs/Container/IDsIndex';
import ForgotPassWord from '../Modules/Login/Containers/Signin/ForgotPassword';
import SignInContainer from '../Modules/Login/Containers/Signin/SignInindex';
import SignUpContainer from '../Modules/Login/Containers/Signin/SignUpContainer';
import VerifyUserContainer from '../Modules/Login/Containers/Signin/VerifyUserContainer';
import OffersScreen from '../Modules/Offers/Container/offersIndex';
import PassbookScreen from '../Modules/Passbook/Container/passbookIndex';
import PaymentsScreen from '../Modules/PaymentDetails/Container/paymentDetailsIndex';
import PaymentOptionsScreen from '../Modules/PaymentOptions/Container/paymentOptionsIndex';
import ProfileScreen from '../Modules/Profile/Container/profileIndex';
import CustomSidebarMenu from '../Modules/SideMenu/Component/sidemenu';
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

function CustomNavigationBar({navigation, back, route}) {
  const {name} = route;
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={name} />
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
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: 'Login',
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpContainer}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: 'Sign Up',
          headerTitleAlign: 'center',
          headerTitleStyle: appHeaderStyle,
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
    </Stack.Navigator>
  );
}

function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Spalsh" component={Splash} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={MyDrawer} />
    </Stack.Navigator>
  );
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitle: props => (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <SmallLogo
                width={30}
                height={30}
                color={Colors.appThemeTextColor}
              />
              {/* <Typography variant="title" color={Colors.appThemeTextColor}>
                FG Punt
              </Typography> */}
            </View>
          ),
          headerTitleAlign: 'center',
          headerLeft: () => (
            {marginLeft: 'auto'},
            (
              <View style={{marginLeft: 10}}>
                <Icon
                  name="menu"
                  size={28}
                  color={Colors.appThemeTextColor}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            )
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="notifications"
                size={28}
                color={Colors.appThemeTextColor}
                onPress={() => navigation.navigate('Notification')}
              />
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
                navigation.goBack();
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
      <Stack.Screen
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Top Offers"
        component={OffersScreen}
        options={() => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
        })}
      />
    </Stack.Navigator>
  );
};
const PassbookStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Passbook"
        component={PassbookScreen}
        options={() => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
        })}
      />
    </Stack.Navigator>
  );
};

const IDsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IDs"
        component={IDsScreenPage}
        options={() => ({
          headerStyle: {backgroundColor: Colors.appPrimaryColor},
          headerTitleStyle: appHeaderStyle,
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
      drawerStyle={{
        marginVertical: 80,
        borderTopRightRadius: 30,
        backgroundColor: Colors.appWhiteColor,
        borderBottomRightRadius: 30,
        paddingTop: 0,
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
      tabBarOptions={{
        activeTintColor: Colors.appPrimaryColor,
        inactiveTintColor: Colors.appWhiteColor,
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: Colors.appBlackColorLight,
          borderTopWidth: 0,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName, type;
          if (route.name === 'Home') {
            iconName = 'home';
            type = 'foundation';
          } else if (route.name === 'Offers') {
            iconName = 'local-offer';
          } else if (route.name === 'Passbook') {
            iconName = 'book';
          } else if (route.name === "ID's") {
            iconName = 'switch-account';
          }
          return <Icon size={28} type={type} name={iconName} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Offers" component={OffersStackNavigator} />
      <Tab.Screen name="Passbook" component={PassbookStackNavigator} />
      <Tab.Screen
        name="ID's"
        component={IDsStackNavigator}
        initialRouteName="ID's"
      />
    </Tab.Navigator>
  );
};

export {AppContainer, logoutAndResetNavigation};
