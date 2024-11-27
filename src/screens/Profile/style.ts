import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {RFValue} from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
interface iconsProps {
  focado: boolean;
}
export const TexLoading = styled.Text`
  color: ${({theme}) => theme.colors.primary};
`;
export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
`;
export const Header = styled.View`
  flex-direction: row;
  padding: 0 ${RFValue(10)}px;
  justify-content: space-between;
`;
export const RequestsButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const RequestsIcon = styled(AntDesign)<iconsProps>`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(35)}px;
`;
export const Number = styled.Text<iconsProps>`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  color: ${({theme, focado}) => (focado ? theme.colors.primary : 'black')};
`;
export const PictureContainer = styled.View`
  gap: ${RFValue(5)}px;
  align-items: center;
  justify-content: center;
  padding: ${RFValue(10)}px 0;
`;

export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(100)}px;
  width: ${RFValue(80)}px;
`;

export const ProfileName = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const ContainerPubFoll = styled.View`
  flex-direction: row;
`;

export const ContainerPub = styled.View`
  flex: 1;
`;

export const ContainerFollowers = styled.TouchableOpacity`
  flex: 1;
`;

export const ContainerFollowed = styled.TouchableOpacity`
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
  width: 20%;
  flex-direction: column;
  align-items: flex-end;
`;
export const SettingButton = styled.TouchableOpacity``;
export const SettingIcon = styled(Ionicons)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(35)}px;
`;

export const CountContainer = styled.View`
  width: 100%;
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
export const ChatButton = styled.TouchableOpacity``;
export const ChatIcon = styled(Entypo)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(40)}px;
`;

export const GuideFlex = styled.View`
  align-items: center;
  padding: ${RFValue(6)}px ${RFValue(6)}px 0;
`;
export const AddFoodContainer = styled.View`
  justify-content: center;
  margin: 0 auto;
  padding: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(10)}px;
`;

export const GuideButton = styled.TouchableOpacity`
  margin: 0 ${RFValue(10)}px ${RFValue(16)}px;
`;
export const GuildeContainer = styled.View`
  width: ${RFValue(120)}px;
`;
export const GuildeImage = styled.Image`
  width: ${RFValue(120)}px;
  height: ${RFValue(200)}px;
  border-radius: ${RFValue(12)}px;
`;
export const GuildetitleContainer = styled.View`
  width: ${RFValue(120)}px;
  height: ${RFValue(30)}px;
`;
export const Guildetitle = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: ${RFValue(16)}px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const DeleteIconContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerBackButton = styled.TouchableOpacity`
  padding-top: ${RFValue(10)}px;
  height: ${RFValue(50)}px;
`;
export const IconBack = styled(Ionicons)`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(30)}px;
  justify-content: flex-start;
`;
export const DeleteButton = styled.TouchableOpacity``;
export const DeleteIcon = styled(AntDesign)``;
export const ModalTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(26)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  padding-bottom: ${RFValue(6)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const ModalPictureContainer = styled.View`
  flex: 1;
  margin: 0 auto;
  padding-bottom: ${RFValue(6)}px;
  height: ${RFValue(300)}px;
  width: ${RFValue(300)}px;
`;

export const ModalPicture = styled.Image`
  border-radius: 12px;
  width: 100%;
  height: 100%;
`;

export const ModalTextContainer = styled.View`
  flex: 1;
  padding-bottom: ${RFValue(6)}px;
`;

export const ModalText = styled.Text`
  text-align: justify;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.regular};
`;
