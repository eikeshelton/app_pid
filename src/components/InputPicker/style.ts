import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PickerContainer = styled.View`
  background-color: ${({theme}) => theme.colors.colorInput};
  color: ${({theme}) => theme.colors.colorWhite};
  padding-left: ${RFValue(8)}px;
  border-radius: ${RFValue(18)}px;
  margin-bottom: ${RFValue(12)}px;
  height: ${RFValue(50)}px;
  border: 2px solid gray;
`;
