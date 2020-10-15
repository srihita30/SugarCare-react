import React from 'react';
import {View, Text} from 'react-native';
import {Input} from 'react-native-elements';

import styles from './styles';

const InputComponent = props => {
  const {
    label,
    value,
    onChange,
    maxLength = 30,
    editable = true,
    ...otherProps
  } = props;
  const renderLabel = () => {
    return (
      <Text
        style={[
          styles.floatingLabel,
          styles.bg_white,
          styles.floatingLabel__active,
        ]}>
        {label}
      </Text>
    );
  };

  const renderField = () => {
    return (
      <Input
        {...otherProps}
        returnKeyType="done"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardShouldPersistTaps="handled"
        maxLength={maxLength}
        placeholderTextColor={styles.placeholderTextColor.color}
        placeholder={`Enter ${label}`}
        labelStyle={styles.labelStyle}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        editable={editable}
        onChangeText={onChange}
        value={value}
      />
    );
  };

  return (
    <View>
      {renderLabel()}
      {renderField()}
    </View>
  );
};

export default InputComponent;
