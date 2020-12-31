import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import routes from '../../constants/routes';
import AsyncStorage from '@react-native-community/async-storage';
import { SESSION_DETAILS } from '../../constants';

export default class LogoutModal extends React.Component {
    renderLogoutPopupContent = () => {
        return (
        <View style={styles.modal}>
            <View style={styles.messageBox}>
            <Text style={styles.message_main}> Do you want to Logout ?</Text>
            <View style={styles.row}>
            <TouchableOpacity onPress={async ()=>{
                await AsyncStorage.setItem(SESSION_DETAILS.TOKEN, '');
                this.props.closeModal();
                this.props.navigation.navigate(routes.LOGIN);
                }}>
                <View style={[styles.btn,styles.btn_primary,styles.btn_medium]}>
                    <Text style={styles.btn_primary_text}>Logout</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.props.closeModal()}}>
            <View style={[styles.btn,styles.btn_secondary,styles.btn_medium]}>
                    <Text style={styles.btn_secondary_text}>Cancel</Text>
                </View>
            </TouchableOpacity>
            </View>
            </View>
        </View> 
        )
      }
    
    render() {
        return(
            <Modal isVisible={this.props.visible} onBackdropPress={()=>{this.props.closeModal()}}>{this.renderLogoutPopupContent()}</Modal>
        )
    }
}