import React from 'react';
import {View, Text} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';

import styles from './styles';

const DropdownComponent = ({items, value, label, onChange}) => {
  const renderLabel = () => {
    return <Text style={styles.label}>{label}</Text>;
  };

  const renderField = () => {
    return (
      <View style={styles.pickerContainer}>
        <Dropdown
          data={items}
          value={value}
          onChangeText={onChange}
          dropdownOffset={styles.dropdownOffset}
          inputContainerStyle={styles.inputContainerStyle}
          itemTextStyle={styles.textInput}
          selectedItemColor={styles.selectedItemColor.color}
          style={styles.textInput}
        />
      </View>
    );
  };

  return (
    <View>
      {renderLabel()}
      {renderField()}
    </View>
  );
};

export default DropdownComponent;
