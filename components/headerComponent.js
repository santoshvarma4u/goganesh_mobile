import React from 'react';
import {Header} from 'react-native-elements';
function HeaderComponent(props) {
  return (
    <Header
      containerStyle={{
        backgroundColor: '#e39b11',
      }} // or directly
      centerComponent={{text: props.title, style: {color: '#fff'}}}
      style={{backgroundColor: '#e39b11'}}
      leftComponent={{icon: 'menu', color: '#fff'}}
      rightComponent={{icon: 'notifications', color: '#fff'}}
    />
  );
}

export default HeaderComponent;
