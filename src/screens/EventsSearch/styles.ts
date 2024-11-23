import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ScreenBackgroundRegister = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const Header = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const Container = styled.View``;
export const PageTitleContainer = styled.View`
  padding: 0 0 ${RFValue(10)}px 0;
`;
export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const ContainerInputRegister = styled.View`
  width: 100%;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
  padding-bottom: ${RFValue(50)}px;
`;

export const ContainerButton = styled.View`
  width: 100%;
  flex: 1;
  margin: ${RFValue(10)}px 0 0 0;
`;

export const ClickableText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(16)}px;
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;

export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;

export const SelectLocation = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.colorInput};
  padding: ${RFValue(6)}px ${RFValue(10)}px;
  margin-bottom: ${RFValue(5)}px;
  border-radius: 10px;
  border: solid 1px gray;
`;
export const PictureContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: solid 1px ${({theme}) => theme.colors.primary};
  border-radius: 24px;
  margin-bottom: ${RFValue(10)}px;
  margin-left: ${RFValue(10)}px;
  height: ${RFValue(150)}px;
  width: ${RFValue(130)}px;
`;

export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
`;
export const SelectLocationTitle = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;
export const SelectLocationSubTitle = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;
export const ContainerSearchResult = styled.View`
  width: 100%;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;
export const BodyEvent = styled.View`
  width: 100%;
  border-width: ${RFValue(2)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${({theme}) => theme.colors.primary};
  padding: ${RFValue(8)}px;
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;
export const ContainerOrganizer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ContainerOrganizerPicture = styled.TouchableOpacity`
  flex: 1;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${({theme}) => theme.colors.primary};
  align-items: center;
`;
export const OrganizerPicture = styled.Image`
  border-radius: 100px;
  height: ${RFValue(50)}px;
  width: ${RFValue(50)}px;
`;
export const OrganizerText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(12)}px;
  font-family: ${({theme}) => theme.fonts.light};
`;
export const EventTitle = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  margin: 0 0 ${RFValue(8)}px 0;
`;
export const ContainerEventIcon = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(4)}px;
  padding-right: ${RFValue(22)}px;
`;
export const ContainerEventIconButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(8)}px;
  border-color: ${({theme}) => theme.colors.primary};
  gap: ${RFValue(4)}px;
  padding-right: ${RFValue(22)}px;
`;
export const EventText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  margin: 0 0 ${RFValue(2)}px 0;
`;
export const ContainerButtonEvent = styled.View`
  width: 100%;
  margin: ${RFValue(16)}px 0 0 0;
`;
