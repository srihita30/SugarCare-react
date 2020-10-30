import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MyHealth from '../../screens/MyHealth';
import routes from '../../constants/routes';

import {screenOptions} from '../navigation-service';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.MY_HEALTH} component={MyHealth} />
    </Stack.Navigator>
  );
}
