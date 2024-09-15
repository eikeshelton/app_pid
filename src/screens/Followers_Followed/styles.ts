import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;
export const Body = styled.View``;

export const UserContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0 auto;
`;

export const Title = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.bold};
  font-size: ${RFValue(22)}px;
`;

export const Text = styled.Text`
  text-align: center;
  color: ${({theme}) => theme.colors.colorWhite};
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  padding: ${RFValue(3)}px 0 0 0;
`;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(120)}px;
  width: ${RFValue(120)}px;
  margin: ${RFValue(16)}px 0 0 0;
`;
