import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './Button.styles';

export default Button = props => {
    const {label, onClick, disabled} = props;
    return(
        <View style={styles.formGroup}>
            <TouchableOpacity onPress={disabled ? ()=>{} : ()=>{onClick()}}>
                <View style={disabled ? [styles.btn_disabled, styles.btn,styles.btn_primary,styles.btn_huge] : [styles.btn,styles.btn_primary,styles.btn_huge]}>
                    <Text style={styles.btn_primary_text}>{label}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}