import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import MySugarLevels from '../../screens/History/components/SugarLevels';
import routes from '../../constants/routes';

import {screenOptions} from '../navigation-service';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={routes.SUGAR_LEVEL} component={MySugarLevels} />
    </Stack.Navigator>
  );
}
