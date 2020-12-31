import AsyncStorage from '@react-native-community/async-storage';
import { SESSION_DETAILS } from '../constants';

export const getHttpPostRequest = (request) => {
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    }
}
export const getHttpPostRequestWithAuth = async (request) => {
    const token = await AsyncStorage.getItem(SESSION_DETAILS.TOKEN);
    return {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request)
    }
}
export const getHttpGetRequest = async (request) => {
    const token = await AsyncStorage.getItem(SESSION_DETAILS.TOKEN);
    return {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
}

export const getHttpPutRequest = async (request) => {
    const token = await AsyncStorage.getItem(SESSION_DETAILS.TOKEN);
    return {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    }
}