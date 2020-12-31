import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./Footer.styles";
import { Icon } from "react-native-elements";
import routes from "../../constants/routes";

export default (Footer = (props) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(routes.DASHBOARD);
        }}
        style={[styles.icon, styles.icon_d]}
      >
        <Icon
          name="home"
          type="material-community"
          color={props.focus == 1 ? "#1E90FF" : "#000000"}
          size={40}
        />
        <Text
          style={props.focus == 1 ? styles.icon_focus : styles.icon_unfocus}
        >
          {routes.DASHBOARD}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(routes.MY_HEALTH);
        }}
        style={[styles.icon, styles.icon_p]}
      >
        <Icon
          name="heart-outline"
          type="material-community"
          color={props.focus == 2 ? "#1E90FF" : "#000000"}
          size={40}
        />
        <Text
          style={props.focus == 2 ? styles.icon_focus : styles.icon_unfocus}
        >
          {routes.MY_HEALTH}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(routes.HISTORY);
        }}
        style={[styles.icon, styles.icon_h]}
      >
        <Icon
          name="history"
          type="material-community"
          color={props.focus == 3 ? "#1E90FF" : "#000000"}
          size={40}
        />
        <Text
          style={props.focus == 3 ? styles.icon_focus : styles.icon_unfocus}
        >
          {routes.HISTORY}
        </Text>
      </TouchableOpacity>
    </View>
  );
});
