import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const Tile = props => {
  const {title, subtitle, actionName, onPress, noPadding} = props;
  const actionComponent = () => {
    if (actionName) {
      return (
        <TouchableOpacity
          onPress={onPress}
          style={[styles.titleBar_action_container, styles.shadow]}>
          <Text style={styles.titleBar_action}>{actionName}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const contentContainerStyles = [styles.content_container, styles.shadow];
  if (noPadding) {
    contentContainerStyles.push({padding: 0});
  }

  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <View style={styles.titleBar}>
          <Text style={styles.titleBar_title}>{title}</Text>
          {actionComponent()}
        </View>
        <Text style={styles.titleBar_subtitle}>{subtitle}</Text>
      </View>

      <View style={contentContainerStyles}>{props.children}</View>
    </View>
  );
};

export default Tile;
