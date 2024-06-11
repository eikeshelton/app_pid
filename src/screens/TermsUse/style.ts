import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const ContainerImagemTerms = styled.View`
  width: 100%;
  height: ${RFValue(150)}px;
`;
export const TermsText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.light};
  text-align: center;
  padding-left: ${RFValue(5)}px;
  padding-right: ${RFValue(5)}px;
  padding-bottom: ${RFValue(10)}px;
`;
