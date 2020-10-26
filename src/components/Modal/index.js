import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const ModalComponent = props => {
  const {isVisible, onToggle, draggable = true, height} = props;

  const renderContent = () => {
    const containerStyles = [styles.container];
    if (height) {
      containerStyles.push({height, padding: 20});
    }

    return (
      <View style={containerStyles}>
        <View style={styles.content}>
          {/* {draggable ? <View style={styles.dragBar} /> : null} */}
          {props.children}
        </View>
      </View>
    );
  };

  const swipeDirection = [];
  if (draggable) {
    swipeDirection.push('down');
  }

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onToggle}
      onBackdropPress={onToggle}
      swipeDirection={swipeDirection}
      style={styles.bottomModal}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        renderContent()
      )}
    </Modal>
  );
};

export default ModalComponent;
