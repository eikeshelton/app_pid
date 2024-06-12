import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  height: ${RFValue(47)}px;
  border-color: ${({theme}) => theme.colors.primary};
  border-style: solid;
`;
export const InputButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: ${RFValue(6)}px;
  border: solid 2px ${({theme}) => theme.colors.primary};
`;

export const TextButton = styled.Text`
  text-align: center;
  color: white;
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.medium};
`;
