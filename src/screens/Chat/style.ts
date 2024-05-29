import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 5px 25px;
`;
export const Header = styled.View`
  flex-direction: row;
  width: 40%;
  align-items: flex-start;
  padding: 10px 0px;
`;
const PictureProfileHeight = Dimensions.get('window').height * 0.14;
const PictureProfileWidth = Dimensions.get('window').width * 0.2;

export const PictureProfile = styled.Image`
  border-radius: 100px;
  height: ${PictureProfileHeight}px;
  width: ${PictureProfileWidth}px;
`;
export const PictureContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  margin-bottom: ${RFValue(10)}px;
  margin-left: ${RFValue(10)}px;
  height: ${RFValue(150)}px;
  width: ${RFValue(130)}px;
`;

const ProfilePictureHeight = Dimensions.get('window').height * 0.1;
const ProfilePictureWidth = Dimensions.get('window').width * 0.2;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;
export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
`;
