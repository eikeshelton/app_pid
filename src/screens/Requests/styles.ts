import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.backgroundColor};
  flex: 1;
`;
export const RequestContainer = styled.View``;
export const PictureContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: solid 1px ${({theme}) => theme.colors.primary};
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
export const RequestContainerButton = styled.View`
  flex-direction: row;
  margin-left: ${RFValue(10)}px;
  gap: 10px;
`;
export const RequestButton = styled.TouchableOpacity`
  border: solid 2px ${({theme}) => theme.colors.primary};
  border-radius: 24px;
  padding: ${RFValue(3)}px;
`;
export const RequestButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;
