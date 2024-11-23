import {RFValue} from 'react-native-responsive-fontsize';
import TextInputMask from 'react-native-text-input-mask';
import styled from 'styled-components/native';

interface InputProps {
  isFocused: boolean;
  inputId: number;
  height?: number;
}

export const StyledTextInput = styled(TextInputMask)<InputProps>`
  background-color: ${({theme}) => theme.colors.colorInput};
  color: ${({theme}) => theme.colors.colorWhite};
  padding-left: ${RFValue(14)}px;
  padding-right: ${RFValue(14)}px;
  border-radius: ${RFValue(18)}px;
  margin-bottom: ${RFValue(12)}px;
  height: ${({height}) => (height ? `${height}px` : `${RFValue(50)}px`)};
  font-size: ${RFValue(14)}px;
  border: 2px solid
    ${({theme, isFocused}) => (isFocused ? theme.colors.primary : 'gray')};
`;
