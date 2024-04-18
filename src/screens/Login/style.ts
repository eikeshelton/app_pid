import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const ContainerImagem = styled.View`
  width: 100%;
  height: ${RFValue(180)}px;
`;

export const ContentLogin = styled.View`
  padding: 0 ${RFValue(24)}px;
`;

export const ContainerInputLogin = styled.View`
  width: 100%;
`;

export const ContainerButton = styled.View`
  margin-top: ${RFValue(18)}px;
`;

export const FooterLogin = styled.View`
  padding: ${RFValue(24)}px;
`;

export const FooterDescription = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.light};
  padding-bottom: ${RFValue(10)}px;
`;

export const ClickText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  padding-bottom: ${RFValue(10)}px;
  text-decoration-line: underline;
`;

export const NewHere = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: ${RFValue(10)}px;
  margin-top: ${RFValue(10)}px;
`;
export const TermsUse = styled.View`
  justify-content: space-between;
`;
export const Welcome = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(50)}px;
  font-family: ${({theme}) => theme.fonts.light};
  text-align: center;
  margin-top: ${RFValue(20)}px;
`;
