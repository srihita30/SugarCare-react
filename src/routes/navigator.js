import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from '../constants/routes';
import {tabBarOptions} from './navigation-service';

import DashboardRoutes from './stack-routes/dashboard-route';
import MyHealthRoutes from './stack-routes/my-health-route';

const Tab = createBottomTabNavigator();
const dashboardTabOptions = {
  tabBarIcon: ({color, size, focused}) => {
    if (focused) {
      return (
        <Icon name="home" type="material-community" color={color} size={30} />
      );
    }
    return (
      <Icon
        name="home-outline"
        type="material-community"
        color={color}
        size={30}
      />
    );
  },
};

const myHealthTabOptions = {
  tabBarIcon: ({color, size, focused}) => {
    if (focused) {
      return <Icon name="ios-heart" type="ionicon" color={color} size={30} />;
    }
    return (
      <Icon name="ios-heart-empty" type="ionicon" color={color} size={30} />
    );
  },
};

export default function RouteContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name={routes.DASHBOARD}
          component={DashboardRoutes}
          options={dashboardTabOptions}
        />
        <Tab.Screen
          name={routes.MY_HEALTH}
          component={MyHealthRoutes}
          options={myHealthTabOptions}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
