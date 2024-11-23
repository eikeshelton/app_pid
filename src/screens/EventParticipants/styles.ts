import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 5px 25px;
`;
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const SuperContainer = styled.View`
  align-items: center;
  width: 100%;
  gap: ${RFValue(10)}px;
  flex-direction: row;
`;
export const PictureContainer = styled.View`
  align-items: center;
  height: ${RFValue(90)}px;
  flex-direction: row;
`;
const ProfilePictureHeight = Dimensions.get('window').height * 0.09;
const ProfilePictureWidth = Dimensions.get('window').width * 0.18;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
  border-color: ${({theme}) => theme.colors.primary};
  border-width: ${RFValue(1)}px;
`;
export const TextContainer = styled.View`
  align-items: left;
  flex-direction: column;
`;
export const NameText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const MessageText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: silver;
  font-family: ${({theme}) => theme.fonts.regular};
`;
