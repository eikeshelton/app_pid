import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';

export const TexLoading = styled.Text`
  color: ${({theme}) => theme.colors.primary};
`;
export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const Header = styled.View`
  width: 10%;
`;

export const Container = styled.View`
  flex-direction: row;
  padding: ${RFValue(10)}px 22px;
`;

export const PictureContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

const ProfilePictureHeight = Dimensions.get('window').height * 0.14;
const ProfilePictureWidth = Dimensions.get('window').width * 0.2;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;

export const ProfileName = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};

  font-size: ${RFValue(16)}px;
`;
export const SettingContainer = styled.View`
  width: 70%;
  justify-content: center;
`;
export const ContainerPubFoll = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ContainerPub = styled.View`
  flex: 1;
`;

export const ContainerFollowers = styled.View`
  flex: 1;
`;

export const ContainerFollowed = styled.View`
  flex: 1;
`;

export const TextNumber = styled.Text`
  text-align: center;
  font-size: ${RFValue(17)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;

export const TextPubFoll = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;

export const SettingButton = styled.TouchableOpacity``;

const ContainerBioHeight = Dimensions.get('window').height * 0.1;
const ContainerBioWidth = Dimensions.get('window').width * 1;
export const ContainerNameBio = styled.View`
  height: ${ContainerBioHeight}px;
  width: ${ContainerBioWidth}px;
  padding-left: ${RFValue(3)}px;
`;

export const TextBio = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  padding-bottom: ${RFValue(2)}px;
  font-family: ${({theme}) => theme.fonts.light};
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  width: 100%;

  justify-content: space-between;
  padding: 0 20px;
`;
export const ButtonFollow = styled.View`
  width: 45%;
  padding: 0 ${RFValue(5)}px;
  flex-direction: row;
`;
export const ChatButton = styled.TouchableOpacity``;
export const ChatIcon = styled(Entypo)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
`;
