import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.backgroundColor};
  flex: 1;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(22)}px;
`;

export const RequestContainer = styled.View``;
export const PictureContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(120)}px;
  width: ${RFValue(120)}px;
  margin: ${RFValue(16)}px 0 0 0;
`;
export const Name = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  margin-top: ${RFValue(3)}px;
`;
export const RequestContainerButton = styled.View`
  flex-direction: row;
  margin: ${RFValue(10)}px 0 0 0;
  gap: ${RFValue(10)}px;
  align-items: center;
  justify-content: center;
`;
export const RequestButton = styled.TouchableOpacity`
  border: solid 2px ${({theme}) => theme.colors.primary};
  border-radius: 12px;
  padding: ${RFValue(3)}px;
`;
export const RequestButtonText = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;
