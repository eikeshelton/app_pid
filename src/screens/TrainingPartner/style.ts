import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const ContainerTrainingPartnerNav = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 ${RFValue(24)}px;
`;

export const ContainerImagemRegister = styled.View`
  width: 100%;
  height: ${RFValue(200)}px;
  padding: 0 0 0 0;
`;

export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  padding: ${RFValue(10)}px 0 0 0;
`;

export const ContainerRegister = styled.View`
  width: 100%;
`;

export const RegisterText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  padding: 0 0 ${RFValue(10)}px 0;
`;

export const ContainerSeparator = styled.View`
  width: 100%;
  padding: 0 0 ${RFValue(10)}px 0;
`;

export const SeparatorText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const ContainerSearch = styled.View`
  width: 100%;
`;

export const SearchText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  padding: 0 0 ${RFValue(10)}px 0;
`;
