import React from 'react';
import {Header} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import CustomSidebarMenu from '../screens/sidemenu';
class HeaderComponent extends React.Component {
  hamburger = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.openDrawer());
        }}>
        <Icon name="menu" color="black" size={26} />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <Header
        containerStyle={{
          backgroundColor: '#e39b11',
        }}
        centerComponent={{text: 'props.title', style: {color: '#fff'}}}
        style={{backgroundColor: '#e39b11'}}
        leftComponent={this.hamburger}
        rightComponent={{icon: 'notifications', color: '#fff'}}
      />
    );
  }
}

export default HeaderComponent;
