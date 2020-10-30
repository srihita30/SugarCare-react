import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const APP_LOGO = require('../assets/images/sugarcare_v.png');

const Header = () => {
  return (
    <View style={styles.header}>
      <Image resizeMode="contain" source={APP_LOGO} style={styles.headerLogo} />
      {/* <Text style={styles.headerLogo}>het</Text> */}
    </View>
  );
};

const tabBarOptions = {
  style: styles.footer_tabBar,
  activeTintColor: styles.footer_tabBar__active.color,
  labelStyle: styles.footer_text,
};

const screenOptions = {
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
  headerTintColor: styles.headerTitleStyle.color,
  headerTitleAlign: 'center',
  headerTitle: props => <Header {...props} />,
};

export {tabBarOptions, screenOptions};
