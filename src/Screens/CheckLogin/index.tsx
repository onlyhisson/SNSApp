import React from 'react';
import AsynscStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

const Container = Styled.View `
    flex: 1;
    background-color: #EFEFEF;
    justify-content: center;
    align-items: center;    
`;

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

const CheckLogin = ({ navigation }: Props) => {
    AsyncStorage.getItem('key') // 인증키 여부 확인
        .then(value => {
            if(value) {
                navigation.navigate('MainTabNavigator');
            } else {
                navigation.navigate('LoginNavigator');
            }
        })
        .catch((error: Error) => {
            console.log(error);
        });

    return <Container />;
};

CheckLogin.navigationOption = {
    header: null,
};

export default CheckLogin;
