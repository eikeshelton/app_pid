import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

export const InputContainer = styled.View`
    width: 100%;
    margin-top: ${RFValue(32)}px;
`;

export const ButtonContainer = styled.View`
    margin-top: ${RFValue(24)}px;
    width: 100%;
`;