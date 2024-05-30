import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
interface ContentProps {
  remetente_id: number;
  user_id: any;
}
export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 5px 25px;
`;
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0px;
`;
export const ContainerBackButton = styled.View`
  width: 15%;
`;
export const Content = styled.View<ContentProps>`
  align-self: ${props =>
    props.remetente_id === props.user_id ? 'flex-end' : 'flex-start'};
`;
const PictureProfileHeight = Dimensions.get('window').height * 0.06;
const PictureProfileWidth = Dimensions.get('window').width * 0.12;

export const PictureProfile = styled.Image`
  border-radius: 100px;
  height: ${PictureProfileHeight}px;
  width: ${PictureProfileWidth}px;
`;
export const Name = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  margin-left: ${RFValue(10)}px;
`;

export const ContainerMessageUser = styled.View`
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${RFValue(5)}px;
`;
export const ContainerMessageUser2 = styled.View``;
export const PictureContainerUser = styled.View`
  padding: 13px 12px 13px 30px;
  border-radius: 24px;
  margin-bottom: ${RFValue(15)}px;
  background-color: ${({theme}) => theme.colors.primary};
`;
export const PictureContainerUser2 = styled.View`
  padding: 13px 30px 13px 12px;
  align-items: flex-start;
  background-color: ${({theme}) => theme.colors.colorInput};
  justify-content: center;
  border-radius: 24px;
  margin-bottom: ${RFValue(15)}px;
`;

const ProfilePictureHeight = Dimensions.get('window').height * 0.07;
const ProfilePictureWidth = Dimensions.get('window').width * 0.15;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;

export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: right;
`;
export const MessageUser2 = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: justify;
`;
