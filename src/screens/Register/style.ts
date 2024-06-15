import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ScreenBackgroundRegister = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const PageTitleContainer = styled.View`
  padding: 0 0 ${RFValue(24)}px 0;
`;
export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const ContainerInputRegister = styled.View`
  width: 100%;
  flex: 1;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;

export const InputRegister = styled.TextInput`
  flex: 1;
  background-color: ${({theme}) => theme.colors.colorInput};
  color: ${({theme}) => theme.colors.colorWhite};
  padding-left: ${RFValue(6)}px;
  border-radius: 6px;
  margin: 5px 10px;
`;

export const ContainerButtonRegister = styled.View`
  margin-bottom: ${RFValue(30)}px;
`;

export const ContainerBaseBoardRegister = styled.View`
  width: 100%;
  flex: 1;
  justify-content: space-between;
  margin-top: ${RFValue(5)}px;
`;

export const FooterDescriptionRegister = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  margin-left: ${RFValue(6)}px;
  text-align: center;
`;
export const FooterTermsRegister = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  margin-bottom: ${RFValue(5)}px;
`;
