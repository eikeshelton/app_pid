import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
export const Body = styled.View``;

export const Name = styled.Text`
  color: ${({theme}) => theme.colors.primary};
`;
const ProfilePictureHeight = Dimensions.get('window').height * 0.1;
const ProfilePictureWidth = Dimensions.get('window').width * 0.2;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;
