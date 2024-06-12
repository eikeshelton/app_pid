import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const ContainerImagem = styled.View`
  width: 100%;
  height: ${RFValue(220)}px;
  margin: ${RFValue(24)}px 0;
`;
export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const ContainerInputBio = styled.ScrollView`
  flex: 1;
  width: 60%;
  padding-top: ${RFValue(10)}px;
`;
const ProfilePictureHeight = Dimensions.get('window').height * 0.14;
const ProfilePictureWidth = Dimensions.get('window').width * 0.2;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;
export const ProfileImageContainer = styled.TouchableOpacity`
  width: 100%;
  height: 150px;
  border-radius: 75px;
  background-color: ${({theme}) => theme.colors.colorInput};
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;
export const TextAlterImage = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const ButtonSave = styled.View`
  width: 100%;
  padding: ${RFValue(10)}px;
`;
