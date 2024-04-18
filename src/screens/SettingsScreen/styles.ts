import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: ${RFValue(10)}px ${RFValue(10)}px;
  justify-content: space-between;
`;
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  padding: ${RFValue(5)}px 0;
`;
export const ContainerOptions = styled.View`
  flex: 1;
  padding: ${RFValue(10)}px 0;
`;
export const TouchOptions = styled.TouchableOpacity``;
export const OptionsText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(17)}px;
  text-decoration-line: underline;
`;
