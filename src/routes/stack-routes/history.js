import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import History from '../../screens/History/History';
import routes from '../../constants/routes';

import {screenOptions} from '../navigation-service';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.HISTORY} component={History} />
    </Stack.Navigator>
  );
}
