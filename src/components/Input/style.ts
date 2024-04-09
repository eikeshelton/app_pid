import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

export const Input = styled(TextInputMask)`
    background-color: ${({theme}) => theme.colors.colorInput};
    color: ${({theme}) => theme.colors.colorWhite};
    padding-left: ${RFValue(12)}px;
    border-radius: 6px;
    margin-bottom: ${RFValue(12)}px;
    height: ${RFValue(60)}px;
`;
