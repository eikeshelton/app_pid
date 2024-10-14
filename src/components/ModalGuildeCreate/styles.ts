import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const Container = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
export const ModalContent = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.backgroundColor};
  border-top-width: 2px;
  flex: 1;
  padding: 0 ${RFValue(16)}px;
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
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  font-size: ${RFValue(20)}px;
  padding: 0 0 ${RFValue(20)}px 0;
`;

export const Name = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
`;
export const GuildeContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-bottom: ${RFValue(6)}px;
`;
export const GuildetitleContainer = styled.View`
  width: ${RFValue(120)}px;
  height: ${RFValue(30)}px;
  align-items: center;
`;
export const Guildetitle = styled.Text`
  color: white;
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;
export const GuildeImageButton = styled.TouchableOpacity`
  align-items: center;
`;
export const TitleCamera = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  font-size: ${RFValue(20)}px;
`;
export const GuildeImage = styled.Image`
  width: ${RFValue(120)}px;
  height: ${RFValue(200)}px;
  border-radius: ${RFValue(12)}px;
`;
export const ModalPictureContainer = styled.TouchableOpacity`
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
export const ModalTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(26)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  padding-bottom: ${RFValue(6)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;
export const ModalText = styled.Text`
  text-align: justify;
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.regular};
`;
