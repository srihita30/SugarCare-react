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
    errorMessage,
    ...otherProps
  } = props;
  const renderLabel = () => {
    if(errorMessage) {
      return (
        <Text style={[
          styles.floatingLabel,
          styles.bg_white,
          styles.floatingLabel__active,
          styles.floatingLabel__error
        ]}>{errorMessage}</Text>
      )
    }
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
        // placeholder={`${label}`}
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
