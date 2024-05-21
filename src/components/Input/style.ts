import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

export const Input = styled(TextInputMask)<{isFocused: boolean}>`
  background-color: ${({theme}) => theme.colors.colorInput};
  color: ${({theme}) => theme.colors.colorWhite};
  padding-left: ${RFValue(14)}px;
  padding-right: ${RFValue(14)}px;
  border-radius: ${RFValue(18)}px;
  margin-bottom: ${RFValue(12)}px;
  height: ${RFValue(50)}px;
  font-size: ${RFValue(14)}px;
  border: 2px solid
    ${({theme, isFocused}) => (isFocused ? theme.colors.primary : 'gray')};
`;
