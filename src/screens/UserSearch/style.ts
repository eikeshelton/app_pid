import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';

export const TexLoading = styled.Text`
  color: ${({theme}) => theme.colors.primary};
`;
export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 0 ${RFValue(10)}px;
`;

export const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
`;

export const ContainerTest = styled.View`
  width: 20%;
`;

export const HeaderContainer = styled.View`
  padding: 0 ${RFValue(10)}px;
  flex-direction: row;
  justify-content: center;
`;

export const ContainerBackbutton = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ProfileUser = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-weight: bold;
  font-size: ${RFValue(20)}px;
  margin-left: ${RFValue(5)}px;
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
  padding-left: ${RFValue(5)}px;
  flex-direction: row;
  width: 100%;
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
  width: 80%;
  align-items: flex-end;
`;

export const CountContainer = styled.View`
  width: 100%;
`;

export const ContainerButton = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
export const ButtonIcon = styled.TouchableOpacity``;
export const FollowIcon = styled(SimpleLineIcons)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
`;
export const ChatButton = styled.TouchableOpacity``;
export const ChatIcon = styled(Entypo)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
`;

export const ContainerNameBio = styled.View`
  padding: 0 ${RFValue(16)}px ${RFValue(10)}px ${RFValue(16)}px;
`;

export const TextBio = styled.Text`
  text-align: justify;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  padding-bottom: ${RFValue(2)}px;
  font-family: ${({theme}) => theme.fonts.light};
`;

export const ButtonFollow = styled.View`
  gap: ${RFValue(10)}px;
  width: 100%;
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
`;
