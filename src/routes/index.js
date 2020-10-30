import React from 'react';
import {View, Text} from 'react-native';

import RouteContainer from './navigator';

class AppContainer extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <RouteContainer />
      </View>
    );
  }
}

export default AppContainer;
