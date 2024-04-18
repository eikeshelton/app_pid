import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

export const TexLoading = styled.Text`
  color: ${({theme}) => theme.colors.primary};
`;
export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
`;

export const PictureContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
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

export const ContainerPubFoll = styled.View`
  flex-direction: row;
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
export const SettingContainer = styled.View`
  flex-direction: column;
  width: 70%;
  align-items: flex-end;
`;
export const SettingButton = styled.TouchableOpacity``;
export const SettingIcon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(30)}px;
`;

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

export const LinkButton = styled.TouchableOpacity`
  text-decoration-line: underline;
`;
export const TextLinkButton = styled.Text`
  color: ${({theme}) => theme.colors.colorBlue};
  text-decoration-line: underline;
  font-size: ${RFValue(14)}px;
`;

export const ContainerButtons = styled.View`
  padding: ${RFValue(12)}px;
  flex-direction: row;
`;
export const ButtonFollow = styled.View`
  flex: 1;
  margin-right: ${RFValue(6)}px;
`;
export const ButtonMessage = styled.View`
  flex: 1;
  margin-left: ${RFValue(12)}px;
`;
