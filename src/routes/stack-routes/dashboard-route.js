import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../../screens/Dashboard';
import routes from '../../constants/routes';

import {screenOptions} from '../navigation-service';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.DASHBOARD} component={Dashboard} />
    </Stack.Navigator>
  );
}
