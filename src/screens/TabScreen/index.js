import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import routes from '../../constants/routes';
import {tabBarOptions} from '../../routes/navigation-service';
import DashboardRoutes from '../../routes/stack-routes/dashboard-route';
import MyHealthRoutes from '../../routes/stack-routes/my-health-route';
import HistoryRoutes from '../../routes/stack-routes/history.js';
// import MySugarLevelRoutes from '../../routes/stack-routes/my-sugar-level-route';

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

const myHistoryTabOptions = {
  tabBarIcon: ({color, size, focused}) => {
    if (focused) {
      return <Icon name="history" type="material-community" color={color} size={30} />;
    }
    return (
      <Icon name="history" type="material-community" color={color} size={30} />
    );
  },
};

const mySugarLevelsTabOptions = {
  tabBarIcon: ({color, size, focused}) => {
    if (focused) {
      return <Icon name="chart-bar" type="material-community" color={color} size={30} />;
    }
    return (
      <Icon name="chart-bar" type="material-community" color={color} size={30} />
    );
  },
};
export default class TabScreen extends React.Component {
    render() {
        return (
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
                <Tab.Screen
                    name={routes.HISTORY}
                    component={HistoryRoutes}
                    options={myHistoryTabOptions}
                />
                {/* <Tab.Screen
                    name={routes.SUGAR_LEVEL}
                    component={MySugarLevelRoutes}
                    options={mySugarLevelsTabOptions}
                /> */}
            </Tab.Navigator>
          );
    }
}