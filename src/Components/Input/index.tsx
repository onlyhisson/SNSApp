import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    width: 100%;
    height: 40px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 4px;
    background-color: #FAFAFA;
    border-width: 1px;
    border-color: #D3D3D3;
`;

const InputField = Styled.TextInput`
    flex: 1;
    color: #292929;
`;

interface Props {
    placeholder?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    // across platforms : default, number-pad, decimal-pad, numeric, email-address, phone-pad
    // iOS Only : ascii-capable, url, name-phone-pad, twitter, web-search
    // Android Only : visible-password
    secureTextEntry?: boolean;
    style?: Object;
    clearMode?: boolean;
    onChangeText?: (text: string) => void;
}

// https://facebook.github.io/react-native/docs/textinput
const Input = ({ placeholder, keyboardType, secureTextEntry, style, clearMode, onChangeText }: Props) => {
    return (
        <Container style={style}>
            <InputField
                selectionColor="#292929"                            // The highlight and cursor color of the text input
                secureTextEntry={secureTextEntry}                   // secure a password
                keyboardType={keyboardType?keyboardType:'default'}  // Determines which keyboard to open
                autoCapitalize="none"           // automatically capitalize certain characters
                autoCorrect={false}             // auto-correct
                allowFontScaling={false}        // Specifies whether fonts should scale to respect Text Size accessibility settings.
                placeholderTextColor="#C3C2C8"  
                placeholder={placeholder}
                clearButtonMode={clearMode?'while-editing':'never'} // 텍스트 보기 오른쪽에 지우기 단추가 표시
                onChangeText={onChangeText}     // Callback that is called when the text input's text changes
            />
        </Container>
    )
}