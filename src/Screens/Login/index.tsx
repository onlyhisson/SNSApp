import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Styled from 'styled-components/native';

import Input from '~/Components/Input';
import Button from '~/Components/Button';

const Container = Styled.SafeAreaView`
    flex: 1;
    background-color: #FEFFFF;
`;

const FormContainer = Styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 32px;
`;

const Logo = Styled.Text`
    color: #292929;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
`;

