import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../constants/routes";
import InitialScreen from "../screens/InitialScreen/InitialScreen";
import TabScreen from "../screens/TabScreen";
import Login from "../screens/Login/Login";
import Dashboard from "../screens/Dashboard";
import MyHealth from "../screens/MyHealth";
import History from "../screens/History/History";
import { screenOptions } from "./navigation-service";

const Stack = createStackNavigator();

export default function RouteContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name={routes.DASHBOARD}
          component={Dashboard}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen name={routes.InitialScreen} component={InitialScreen} />
        <Stack.Screen name={routes.LOGIN} component={Login} />

        <Stack.Screen
          name={routes.HISTORY}
          component={History}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name={routes.MY_HEALTH}
          component={MyHealth}
          options={{
            animationEnabled: false,
          }}
        />
        {/* <Stack.Screen name={routes.TAB_SCREEN} component={TabScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
