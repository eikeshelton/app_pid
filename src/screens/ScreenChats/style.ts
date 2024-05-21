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
export const PictureContainer = styled.View`
  align-items: center;
  margin-bottom: ${RFValue(10)}px;
  height: ${RFValue(120)}px;
  width: 100%;
  flex-direction: row;
`;
const ProfilePictureHeight = Dimensions.get('window').height * 0.09;
const ProfilePictureWidth = Dimensions.get('window').width * 0.18;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;
export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  margin-left: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
`;
