import AsyncStorage from "@react-native-community/async-storage";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { URL, USER_DETAIL_KEYS } from "../../constants";
import routes from "../../constants/routes";
import { getHttpPostRequestWithAuth } from "../../utils";

export default class InitialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoadingRegistration: false,
    };
  }

  async componentDidMount() {
    const { screen } = this.props.route.params;
    console.log("the screen is ", screen);
    this.setState({
      loading: true,
    });
    const httpRequest = await getHttpPostRequestWithAuth();
    try {
      const httpResponse = await fetch(URL.AUTHENTICATE, httpRequest);
      if (httpResponse.ok) {
        let response = await httpResponse.json();
        response = JSON.stringify(response);
        await AsyncStorage.setItem(USER_DETAIL_KEYS.USER_DATA, response);
        this.setState({
          loading: false,
        });
        if (screen === "profile") {
          this.props.navigation.navigate(routes.MY_HEALTH);
        } else if (screen == "history") {
          this.props.navigation.navigate(routes.HISTORY);
        }
      } else {
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate(routes.LOGIN);
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
      console.log("excepton in authentication", e);
    }
  }

  render() {
    const { screen } = this.props.route.params;
    if (screen == "history") {
      this.props.navigation.navigate(routes.HISTORY);
    } else if (screen === "profile") {
      this.props.navigation.navigate(routes.MY_HEALTH);
    }
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ECF0F5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    return <View />;
  }
}
