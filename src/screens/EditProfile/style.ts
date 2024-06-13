import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
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
  font-size: ${RFValue(20)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;
export const ContainerInputBio = styled.ScrollView`
  width: 100%;
  flex: 1;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(100)}px;
  width: ${RFValue(80)}px;
`;
export const ProfileImageContainer = styled.TouchableOpacity`
  width: 50%;
  height: 150px;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.colorInput};
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
export const TextAlterImage = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const ButtonSave = styled.View`
  width: 100%;
  padding-top: ${RFValue(10)}px;
`;
export const ClickableText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(16)}px;
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;
