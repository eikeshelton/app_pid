import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ScreenBackgroundRegister = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const PageTitleContainer = styled.View`
  padding: 0 0 ${RFValue(10)}px 0;
`;
export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const ContainerInputRegister = styled.View`
  width: 100%;
  flex: 1;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;

export const ContainerButton = styled.View`
  width: 100%;
  flex: 1;
  margin: ${RFValue(10)}px 0 0 0;
`;

export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;
