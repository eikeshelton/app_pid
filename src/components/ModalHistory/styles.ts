import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;
export const ModalContent = styled.View`
  background-color: white;
  height: 60%;
  padding: 0 24px 24px 24px;
`;
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
  font-size: ${RFValue(20)}px;
`;
export const PictureContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: solid 1px ${({theme}) => theme.colors.primary};
  border-radius: 24px;
  margin-bottom: ${RFValue(10)}px;
  margin-left: ${RFValue(15)}px;
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
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.colors.primary};
  text-align: center;
`;
